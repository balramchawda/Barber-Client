// import Rx from 'rxjs/Rx'
// import {Observable} from 'rxjs'
import { Record } from 'immutable'
import { assign } from 'lodash'
import Cookies from 'universal-cookie'
import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'
import { get } from "lodash"

import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'

import * as api from './api'

/***********************************
 * Action Types
 ***********/
const cookies = new Cookies()
export const GET_CUSTOMER_DATA= 'barberapp/admin/GET_CUSTOMER_DATA'
export const GET_CUSTOMER_DATA_SUCCESS = 'barberapp/admin/GET_CUSTOMER_DATA_SUCCESS'
export const GET_CUSTOMER_DATA_ERROR = 'barberapp/admin/GET_CUSTOMER_DATA_ERROR'

export const GET_CUSTOMER_PROFILE= 'barberapp/admin/GET_CUSTOMER_PROFILE'
export const GET_CUSTOMER_PROFILE_SUCCESS = 'barberapp/admin/GET_CUSTOMER_PROFILE_SUCCESS'
export const GET_CUSTOMER_PROFILE_ERROR = 'barberapp/admin/GET_CUSTOMER_PROFILE_ERROR'

export const GET_BARBER_PROFILE= 'barberapp/admin/GET_BARBER_DATA'
export const GET_BARBER_PROFILE_SUCCESS = 'barberapp/admin/GET_BARBER_PROFILE_SUCCESS'
export const GET_BARBER_PROFILE_ERROR = 'barberapp/admin/GET_BARBER_PROFILE_ERROR'

export const UPDATE_USER_STATUS='barberapp/admin/UPDATE_USER_STATUS'
export const UPDATE_USER_STATUS_SUCCESS='barberapp/admin/UPDATE_USER_STATUS_SUCCESS'
export const UPDATE_USER_STATUS_ERROR='barberapp/admin/UPDATE_USER_STATUS_ERROR'

export const GET_BARBER_DATA= 'barberapp/admin/GET_BARBER_DATA'
export const GET_BARBER_DATA_SUCCESS = 'barberapp/admin/GET_BARBER_DATA_SUCCESS'
export const GET_BARBER_DATA_ERROR = 'barberapp/admin/GET_BARBER_DATA_ERROR'

export const UPDATE_BARBER_STATUS='barberapp/admin/UPDATE_BARBER_STATUS'
export const UPDATE_BARBER_STATUS_SUCCESS='barberapp/admin/UPDATE_BARBER_STATUS_SUCCESS'
export const UPDATE_BARBER_STATUS_ERROR='barberapp/admin/UPDATE_BARBER_STATUS_ERROR'
export const CLEAR_PHASE = 'barberapp/admin/CLEAR_PHASE'

export const ADD_SERVICE_CATEGORY='barberapp/admin/ADD_SERVICE_CATEGORY'
export const ADD_SERVICE_CATEGORY_SUCCESS='barberapp/admin/ADD_SERVICE_CATEGORY_SUCCESS'
export const ADD_SERVICE_CATEGORY_ERROR='barberapp/admin/ADD_SERVICE_CATEGORY_ERROR'

export const GET_CATEGORY_DATA='barberapp/admin/GET_CATEGORY_DATA'
export const GET_CATEGORY_DATA_SUCCESS='barberapp/admin/GET_CATEGORY_DATA_SUCCESS'
export const GET_CATEGORY_DATA_ERROR='barberapp/admin/GET_CATEGORY_DATA_ERROR'

export const UPDATE_CATEGORY_STATUS='barberapp/admin/UPDATE_CATEGORY_STATUS'
export const UPDATE_CATEGORY_STATUS_SUCCESS='barberapp/admin/UPDATE_CATEGORY_STATUS_SUCCESS'
export const UPDATE_CATEGORY_STATUS_ERROR='barberapp/admin/UPDATE_CATEGORY_STATUS_ERROR'

export const ADD_SUBSCRIPTION='barberapp/admin/ADD_SUBSCRIPTION'
export const ADD_SUBSCRIPTION_SUCCESS='barberapp/admin/ADD_SUBSCRIPTION_SUCCESS'
export const ADD_SUBSCRIPTION_ERROR='barberapp/admin/ADD_SUBSCRIPTION_ERROR'

export const GET_SUBSCRIPTION_DATA='barberapp/admin/GET_SUBSCRIPTION_DATA'
export const GET_SUBSCRIPTION_DATA_SUCCESS='barberapp/admin/GET_SUBSCRIPTION_DATA_SUCCESS'
export const GET_SUBSCRIPTION_DATA_ERROR='barberapp/admin/GET_SUBSCRIPTION_DATA_ERROR'

export const UPDATE_SUBSCRIPTION_STATUS='barberapp/admin/UPDATE_SUBSCRIPTION_STATUS'
export const UPDATE_SUBSCRIPTION_STATUS_SUCCESS='barberapp/admin/UPDATE_SUBSCRIPTION_STATUS_SUCCESS'
export const UPDATE_SUBSCRIPTION_STATUS_ERROR='barberapp/admin/UPDATE_SUBSCRIPTION_STATUS_ERROR'

export const GET_PAYMENT_HISTORY='barberapp/admin/GET_PAYMENT_HISTORY'
export const GET_PAYMENT_HISTORY_SUCCESS='barberapp/admin/GET_PAYMENT_HISTORY_SUCCESS'
export const GET_PAYMENT_HISTORY_ERROR='barberapp/admin/GET_PAYMENT_HISTORY_ERROR'

export const GET_SUBSCRIPTION_DETAILS='barberapp/admin/GET_SUBSCRIPTION_DETAILS'
export const GET_SUBSCRIPTION_DETAILS_SUCCESS='barberapp/admin/GET_SUBSCRIPTION_DETAILS_SUCCESS'
export const GET_SUBSCRIPTION_DETAILS_ERROR='barberapp/admin/GET_SUBSCRIPTION_DETAILS_ERROR'

export const UPDATE_SUBSCRIPTION_DETAILS='barberapp/admin/UPDATE_SUBSCRIPTION_DETAILS'
export const UPDATE_SUBSCRIPTION_DETAILS_SUCCESS='barberapp/admin/UPDATE_SUBSCRIPTION_DETAILS_SUCCESS'
export const UPDATE_SUBSCRIPTION_DETAILS_ERROR='barberapp/admin/UPDATE_SUBSCRIPTION_DETAILS_ERROR'


/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  // We need this here to tell InitialState that there is a token key,
  // but it will be reset below to what is in localStorage, unless a value
  // is passed in when the object is instanciated
  customerPhase:INIT,
  customerDetailPhase:INIT,
  customerData:[],
  barberData:[],
  barberPhase:INIT,
  barberDetailPhase:INIT,
  message:'',
  isSuccess:'',
  updateBarberPhase:INIT,
  updateCustomerPhase:INIT,
  addCategoryPhase:INIT,
  categoryPhase:INIT,
  updateCategoryPhase:INIT,
  paymentHistoryPhase:INIT,
  categoryData:[],
  paymentData:[],
  customerDetailData:{},
  barberDetailData:{},
  paymentData:[],
  addSubscriptionPhase:INIT,
  subscriptionData:[],
  subscriptionPhase:INIT,
  updateSubscriptionPhase:INIT,
  updateSubsDetailsPhase:INIT,
  subscriptionDetailPhase:INIT,
  subscriptionDetailData:{}
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = '' // localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/
// eslint-disable-next-line complexity, max-statements

export default function (state = new InitialState(), action = {}) {
  console.log(action.type);
  switch (action.type) {
   case GET_CUSTOMER_DATA : {
      return state
        .set('customerPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_CUSTOMER_DATA_SUCCESS:{
      const {payload}=action;
      if(payload.success){
       return state
        .set('customerPhase',SUCCESS)
        .set('customerData',payload.users)
        .set('message',payload.message)
        .set('isSubmitting',true)   
      }
    }
    
    case GET_CUSTOMER_DATA_ERROR: {
      const { payload } = action
      return state
        .set('customerPhase', ERROR)
        .set('customerData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    case GET_CUSTOMER_PROFILE : {
      return state
        .set('customerDetailPhase', LOADING)
        .set('error', null)
    }
    
    case GET_CUSTOMER_PROFILE_SUCCESS:{
      const {payload}=action;
      console.log(payload.data);
      console.log(payload.paymentHistory);
      if(payload.status){
       return state
        .set('customerDetailPhase',SUCCESS)
        .set('customerDetailData',payload.data)
        .set('paymentData',payload.paymentHistory)
        .set('message',payload.message) 
      }
    }
    
    case GET_CUSTOMER_PROFILE_ERROR: {
      const { payload } = action
      return state
        .set('customerDetailPhase', ERROR)
        .set('customerDetailData', [])
        .set('error', payload.message)
    }
    case UPDATE_USER_STATUS:{
      // console.log('ss');
       return state
        .set('customerStatus', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    case UPDATE_USER_STATUS_SUCCESS:{
          const {payload}=action;
       return state    
        .set('updateCustomerPhase',SUCCESS)
    }
    case UPDATE_USER_STATUS_ERROR:{
      const {payload}=action;
     return state
        .set('customerPhase', ERROR)
        .set('customerData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }
    case GET_BARBER_DATA : {
      return state
        .set('barberPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_BARBER_DATA_SUCCESS:{
      const {payload}=action;
      // console.log(payload)
      if(payload.status){
        console.log(payload);
       return state
        .set('barberPhase',SUCCESS)
        .set('barberData',payload.users)
        // .set('message',payload)
        .set('isSubmitting',true)   
      }
    }
    
    case GET_BARBER_DATA_ERROR: {
      const { payload } = action
      return state
        .set('barberPhase', ERROR)
        .set('barberData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    case GET_BARBER_PROFILE : {
      return state
        .set('barberDetailPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_BARBER_PROFILE_SUCCESS:{
      const {payload}=action;
      // console.log(payload)
      if(payload.status){
        console.log(payload);
       return state
        .set('barberDetailPhase',SUCCESS)
        .set('barberDetailData',payload.data)
        .set('paymentData',payload.paymentHistory)
      }
    }
    
    case GET_BARBER_PROFILE_ERROR: {
      const { payload } = action
      return state
        .set('barberDetailPhase', ERROR)
        .set('barberDetailData', [])
        .set('error', payload.message)
        // .set('isSubmitting', true)
    }

    case UPDATE_BARBER_STATUS:{
      // console.log('ss');
       return state
        .set('barberStatus', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    case UPDATE_BARBER_STATUS_SUCCESS:{
       // console.log(action.payload)
          const {payload}=action;
       return state
        .set('updateBarberPhase',SUCCESS)
        .set('isSuccess', true)
        .set('message', payload.message)
        .set('isSubmitting', true)
    }
    case UPDATE_BARBER_STATUS_ERROR:{
      const {payload}=action;
     return state
        .set('barberPhase', ERROR)
        .set('barberData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }
    case ADD_SERVICE_CATEGORY:{
      // console.log('ss');
       return state
        .set('error', null)
        .set('isSubmitting', true)
    }
    case ADD_SERVICE_CATEGORY_SUCCESS:{
       // console.log(action.payload)
          const {payload}=action;
       return state
        .set('addCategoryPhase',SUCCESS)
        .set('isSuccess', true)
        .set('message', payload.message)
    }
    case ADD_SERVICE_CATEGORY_ERROR:{
      const {payload}=action;
     return state
        .set('addCategoryPhase', ERROR)
    }
    case GET_CATEGORY_DATA:{
      // console.log('ss');
       return state
        .set('error', null)
        .set('isSubmitting', true)
    }
    case GET_CATEGORY_DATA_SUCCESS:{
       // console.log(action.payload)
          const {payload}=action;
       return state
        .set('categoryPhase',SUCCESS)
        .set('categoryData', payload.data)
        .set('message', payload.message)
    }
    case GET_CATEGORY_DATA_ERROR:{
      const {payload}=action;
     return state
        .set('categoryPhase', ERROR)
    }
        case UPDATE_CATEGORY_STATUS:{
      // console.log('ss');
       return state
        .set('categoryStatus', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    case UPDATE_CATEGORY_STATUS_SUCCESS:{
       console.log(action.payload)
          const {payload}=action;
       return state
        .set('updateCategoryPhase',SUCCESS)
        .set('isSuccess', true)
        .set('message', payload.message)
        .set('isSubmitting', true)
    }
    case UPDATE_CATEGORY_STATUS_ERROR:{
      const {payload}=action;
     return state
        .set('updateCategoryStatus', ERROR)
        .set('barberData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }
    case ADD_SUBSCRIPTION:{
      // console.log('ss');
       return state
        .set('error', null)
        .set('isSubmitting', true)
    }
    case ADD_SUBSCRIPTION_SUCCESS:{
       // console.log(action.payload)
          const {payload}=action;
       return state
        .set('addSubscriptionPhase',SUCCESS)
        .set('isSuccess', true)
        .set('message', payload.message)
    }
    case ADD_SUBSCRIPTION_ERROR:{
      const {payload}=action;
     return state
        .set('addSubscriptionPhase', ERROR)
    }
    case GET_SUBSCRIPTION_DATA:{
      // console.log('ss');
       return state
        .set('error', null)
        .set('isSubmitting', true)
    }
    case GET_SUBSCRIPTION_DATA_SUCCESS:{
       // console.log(action.payload)
          const {payload}=action;
       return state
        .set('subscriptionPhase',SUCCESS)
        .set('subscriptionData', payload.data)
        .set('message', payload.message)
    }
    case GET_CATEGORY_DATA_ERROR:{
      const {payload}=action;
     return state
        .set('subscriptionPhase', ERROR)
    }
        case UPDATE_SUBSCRIPTION_STATUS:{
      // console.log('ss');
       return state
        .set('categoryStatus', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    case UPDATE_SUBSCRIPTION_STATUS_SUCCESS:{
       
          const {payload}=action;
       return state
        .set('updateSubscriptionPhase',SUCCESS)
        .set('isSuccess', true)
        .set('message', payload.message)
        .set('isSubmitting', true)
    }
    case UPDATE_SUBSCRIPTION_STATUS_ERROR:{
      const {payload}=action;
     return state
        .set('updateSubscriptionPhase', ERROR)
        .set('subscriptionData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }
    case GET_PAYMENT_HISTORY : {
      return state
        .set('paymentHistoryPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_PAYMENT_HISTORY_SUCCESS:{
      const {payload}=action;
      console.log(payload.data);
      if(payload.status){
       return state
        .set('paymentHistoryPhase',SUCCESS)
        .set('paymentData',payload.data)
        .set('message',payload.message)
        // .set('isSubmitting',true)   
      }
    }
    
    case GET_CUSTOMER_DATA : {
      return state
        .set('customerPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_CUSTOMER_DATA_SUCCESS:{
      const {payload}=action;
      if(payload.success){
       return state
        .set('customerPhase',SUCCESS)
        .set('customerData',payload.users)
        .set('message',payload.message)
        .set('isSubmitting',true)   
      }
    }
    
    case GET_CUSTOMER_DATA_ERROR: {
      const { payload } = action
      return state
        .set('customerPhase', ERROR)
        .set('customerData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    case GET_SUBSCRIPTION_DETAILS : {
      return state
        .set('subscriptionDetailPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case GET_SUBSCRIPTION_DETAILS_SUCCESS:{
      const {payload}=action;
      if(payload.status){
       return state
        .set('subscriptionDetailPhase',SUCCESS)
        .set('subscriptionDetailData',payload.data)
        .set('message',payload.message)
        .set('isSubmitting',true)   
      }
    }
    
    case GET_SUBSCRIPTION_DETAILS_ERROR: {
      const { payload } = action
      return state
        .set('subscriptionDetailPhase', ERROR)
        .set('subscriptionDetailData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    case UPDATE_SUBSCRIPTION_DETAILS : {
      return state
        .set('updateSubsDetailsPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }
    
    case UPDATE_SUBSCRIPTION_DETAILS_SUCCESS:{
      const {payload}=action;
      if(payload.status){
        console.log(payload)
       return state 
        .set('updateSubsDetailsPhase',SUCCESS)
        .set('subscriptionDetailData',payload)
        .set('message',payload.message)
        .set('isSubmitting',true)   
      }
    }
    
    case UPDATE_SUBSCRIPTION_DETAILS_ERROR: {
      const { payload } = action
      return state
        .set('updateSubsDetailsPhase', ERROR)
        .set('subscriptionDetailData', [])
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    // case GET_PAYMENT_HISTORY_ERROR: {
    //   const { payload } = action
    //   console.log(payload)
    //   return state
    //     .set('paymentHistoryPhase', ERROR)
    //     .set('paymentData', [])
    //     .set('error', payload.message)
    //     // .set('isSubmitting', true)
    // }   
    case CLEAR_PHASE: {
      return state
        .set('barberPhase', INIT)
        .set('updateBarberPhase', INIT)
        .set('updateCustomerPhase', INIT)
        .set('updateCategoryPhase', INIT)
        .set('updateSubscriptionPhase', INIT)
        .set('customerPhase', INIT)
        .set('addCategoryPhase',INIT)
        .set('categoryPhase',INIT)
        .set('addSubscriptionPhase',INIT)
        .set('subscriptionPhase',INIT)
        .set('paymentHistoryPhase',INIT)
        .set('customerDetailPhase',INIT)
        .set('updateSubsDetailsPhase',INIT)
        .set('subscriptionDetailPhase',INIT)
        .set('barberDetailPhase',INIT)
        }
    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

//getCustomerData

export const getCustomerData = credentials => {
  // console.log("credentials",credentials);
  return {
    type: GET_CUSTOMER_DATA,
    payload: credentials
  }
}

export const updateCustomerStatus=credentials=>{
  // console.log(credentials)
  return{
   type:UPDATE_USER_STATUS,
   payload:credentials
}
}
export const getBarberData = credentials => {
  // console.log("credentials",credentials);
  return {
    type: GET_BARBER_DATA,
    payload: credentials
  }
}

export const updateBarberStatus=credentials=>{
  // console.log(credentials)
  return{
   type:UPDATE_BARBER_STATUS,
   payload:credentials
}
}

export const updateCategoryStatus=credentials=>{
  // console.log(credentials)
  return{
   type:UPDATE_CATEGORY_STATUS,
   payload:credentials
}
}

export const addServiceCategory=credentials=>{
  // console.log(credentials)
  return{
   type:ADD_SERVICE_CATEGORY,
   payload:credentials
}
}
export const getCategoryData=credentials=>{
  // console.log(credentials)
  return{
   type:GET_CATEGORY_DATA,
   payload:credentials
}
}

export const updateSubscriptionStatus=credentials=>{
  // console.log(credentials)
  return{
   type:UPDATE_SUBSCRIPTION_STATUS,
   payload:credentials
}
}

export const addSubscription=credentials=>{
  // console.log(credentials)
  return{
   type:ADD_SUBSCRIPTION,
   payload:credentials
}
}
export const getSubscriptionData=credentials=>{
  // console.log(credentials)
  return{
   type:GET_SUBSCRIPTION_DATA,
   payload:credentials
}
}

export const adminClearPhase=credentials=>{
  // console.log(credentials)
  return{
   type:CLEAR_PHASE,
   payload:credentials
}
}

export const getPaymentHistory=credentials=>{
  // console.log(credentials)
  return{
   type:GET_PAYMENT_HISTORY,
   payload:credentials
}
}
export const getBarberProfile=credentials=>{
  console.log(credentials)
  return{
   type:GET_BARBER_PROFILE,
   payload:credentials
}
}
export const getCustomerProfile=credentials=>{
  // console.log(credentials)
  return{
   type:GET_CUSTOMER_PROFILE,
   payload:credentials
}
}
export const getSubscriptionById=credentials=>{
  // console.log(credentials)
  return{
   type:GET_SUBSCRIPTION_DETAILS,
   payload:credentials
}
}

export const updateSubscriptionDetails=credentials=>{
  // console.log(credentials)
  return{
   type:UPDATE_SUBSCRIPTION_DETAILS,
   payload:credentials
}
}


/***********************************
 * Epics
 ***********************************/
const getCustomerDataEpic = action$ =>
  action$.pipe(
    ofType(GET_CUSTOMER_DATA),
    mergeMap(action => {
        return fromPromise(api.getCustomerData(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_CUSTOMER_DATA_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_CUSTOMER_DATA_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getCustomerDetailsEpic = action$ =>
  action$.pipe(
    ofType(GET_CUSTOMER_PROFILE),
    mergeMap(action => {
        return fromPromise(api.getCustomerDetails(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_CUSTOMER_PROFILE_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_CUSTOMER_PROFILE_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updateUserStatusEpic=action$=>
  action$.pipe(
    ofType(UPDATE_USER_STATUS),
    mergeMap(action=>{
      return fromPromise(api.updateUserStatus(action.payload)).pipe(
        flatMap(payload=>[
        {
          type:UPDATE_USER_STATUS_SUCCESS,
          payload
        }
          ]),
         catchError(error => 
            of({
            type: UPDATE_USER_STATUS_ERROR,
            payload: { error }
          })
        )
        )
    })
    )

const getBarberDataEpic = action$ =>
  action$.pipe(
    ofType(GET_BARBER_DATA),
    mergeMap(action => {
        return fromPromise(api.getBarberData(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_BARBER_DATA_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_BARBER_DATA_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getBarberDetailsEpic = action$ =>
  action$.pipe(
    ofType(GET_BARBER_PROFILE),
    mergeMap(action => {
        return fromPromise(api.getBarberDetails(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_BARBER_PROFILE_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_BARBER_PROFILE_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updateBarberStatusEpic=action$=>
  action$.pipe(
    ofType(UPDATE_BARBER_STATUS),
    mergeMap(action=>{
      return fromPromise(api.updateBarberStatus(action.payload)).pipe(
        flatMap(payload=>[
        {
          type:UPDATE_BARBER_STATUS_SUCCESS,
          payload
        }
          ]),
         catchError(error => 
            of({
            type: UPDATE_USER_STATUS_ERROR,
            payload: { error }
          })
        )
        )
    })
    )

const addServiceCategoryEpic = action$ =>
  action$.pipe(
    ofType(ADD_SERVICE_CATEGORY),
    mergeMap(action => {
        return fromPromise(api.addServiceCategory(action.payload)).pipe(
          flatMap(payload => [
            {
              type: ADD_SERVICE_CATEGORY_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: ADD_SERVICE_CATEGORY_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getCategoryDataEpics = action$ =>
  action$.pipe(
    ofType(GET_CATEGORY_DATA),
    mergeMap(action => {
        return fromPromise(api.getCategoryData(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_CATEGORY_DATA_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_CATEGORY_DATA_ERROR,
            payload: { error }
          })
        )
      )
    })
  )
const updateCategoryStatusEpic=action$=>
  action$.pipe(
    ofType(UPDATE_CATEGORY_STATUS),
    mergeMap(action=>{
      return fromPromise(api.updateCategoryStatus(action.payload)).pipe(
        flatMap(payload=>[
        {
          type:UPDATE_CATEGORY_STATUS_SUCCESS,
          payload
        }
          ]),
         catchError(error => 
            of({
            type: UPDATE_CATEGORY_STATUS_ERROR,
            payload: { error }
          })
        )
        )
    })
    )

const addSubscriptionEpic = action$ =>
  action$.pipe(
    ofType(ADD_SUBSCRIPTION),
    mergeMap(action => {
        return fromPromise(api.addSubscription(action.payload)).pipe(
          flatMap(payload => [
            {
              type: ADD_SUBSCRIPTION_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: ADD_SUBSCRIPTION_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getSubscriptionDataEpics = action$ =>
  action$.pipe(
    ofType(GET_SUBSCRIPTION_DATA),
    mergeMap(action => {
        return fromPromise(api.getSubscriptionData(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_SUBSCRIPTION_DATA_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_SUBSCRIPTION_DATA_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updateSubscriptionStatusEpic=action$=>
  action$.pipe(
    ofType(UPDATE_SUBSCRIPTION_STATUS),
    mergeMap(action=>{
      return fromPromise(api.updateSubscriptionStatus(action.payload)).pipe(
        flatMap(payload=>[
        {
          type:UPDATE_SUBSCRIPTION_STATUS_SUCCESS,
          payload
        }
          ]),
         catchError(error => 
            of({
            type: UPDATE_SUBSCRIPTION_STATUS_ERROR,
            payload: { error }
          })
        )
        )
    })
    )

const getPaymenthistoryEpic = action$ =>
  action$.pipe(
    ofType(GET_PAYMENT_HISTORY),
    mergeMap(action => {
        return fromPromise(api.getPaymentHistory(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_PAYMENT_HISTORY_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_PAYMENT_HISTORY_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getSubscriptionDetailsEpic = action$ =>
  action$.pipe(
    ofType(GET_SUBSCRIPTION_DETAILS),
    mergeMap(action => {
        return fromPromise(api.getSubscriptionDetails(action.payload)).pipe(
          flatMap(payload => [
            {
              type: GET_SUBSCRIPTION_DETAILS_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: GET_SUBSCRIPTION_DETAILS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updateSubscriptionDetailsEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_SUBSCRIPTION_DETAILS),
    mergeMap(action => {
        return fromPromise(api.updateSubscriptionDetails(action.payload)).pipe(
          flatMap(payload => [
            {
              type: UPDATE_SUBSCRIPTION_DETAILS_SUCCESS,
              payload
            }
          ]),
          catchError(error => 
            of({
            type: UPDATE_SUBSCRIPTION_DETAILS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


export const adminEpic = combineEpics(
  getCustomerDataEpic,
  updateUserStatusEpic,
  updateBarberStatusEpic,
  getBarberDataEpic,
  addServiceCategoryEpic,
  getCategoryDataEpics,
  updateCategoryStatusEpic,
  getPaymenthistoryEpic,
  getBarberDetailsEpic,
  getCustomerDetailsEpic,
  updateSubscriptionStatusEpic,
  getSubscriptionDataEpics,
  addSubscriptionEpic,
  updateSubscriptionDetailsEpic,
  getSubscriptionDetailsEpic
)
