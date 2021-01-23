import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import { Record } from 'immutable'
import { ofType, combineEpics } from 'redux-observable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/
export const LOGIN_USER = 'barberapp/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'barberapp/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'barberapp/user/LOGIN_USER_ERROR'

export const SIGNUP_USER = 'flyfriends/user/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'flyfriends/user/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'flyfriends/user/SIGNUP_USER_ERROR'

export const GET_USER = 'flyfriends/user/GET_USER'
export const GET_USER_SUCCESS = 'flyfriends/user/GET_USER_SUCCESS'
export const GET_USER_ERROR = 'flyfriends/user/GET_USER_ERROR'

export const NOTIFY_USER = 'flyfriends/user/NOTIFY_USER'
export const NOTIFY_USER_SUCCESS = 'flyfriends/user/NOTIFY_USER_SUCCESS'
export const NOTIFY_USER_ERROR = 'flyfriends/user/NOTIFY_USER_ERROR'

export const UPDATE_USER = 'flyfriends/user/UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'flyfriends/user/UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'flyfriends/user/UPDATE_USER_ERROR'

export const FORGOT_USER = 'barberapp/user/FORGOT_USER'
export const FORGOT_USER_SUCCESS = 'barberapp/user/FORGOT_USER_SUCCESS'
export const FORGOT_USER_ERROR = 'barberapp/user/FORGOT_USER_ERROR'

export const RESET_USER = 'barberapp/user/RESET_USER'
export const RESET_USER_SUCCESS = 'barberapp/user/RESET_USER_SUCCESS'
export const RESET_USER_ERROR = 'barberapp/user/RESET_USER_ERROR'

export const CLEAR_PHASE = 'barberapp/user/CLEAR_PHASE'

export const USER_LOGOUT = 'barberapp/user/USER_LOGOUT'
/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null, // We need this here to tell InitialState that there is a token key,
  // but it will be reset below to what is in localStorage, unless a value
  // is passed in when the object is instanciated
  loginPhase: INIT,
  forgotPhase:INIT,
  resetPhase: INIT,
  notifyPhase: INIT,
  userPhase: INIT,
  signupPhase: INIT,
  updateUserPhase: INIT,
  userCount: 0,
  signupuserdata: {},
  error: {},
  message: '',
  forgotError: {},
  loginError: '',
  signupError: {},
  resetError: {},
  user: {},
  isSuccess: false
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = localStorage.getItem('Authorization')
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements

export default function (state = new InitialState(), action = {}) {
  switch (action.type) {
    case LOGIN_USER: {
      return state.set('loginPhase', LOADING).set('loginError', null)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      console.log("payload",payload);
      if(payload.status==true){
      localStorage.setItem('authToken', payload.data)
      return state
        .set('loginPhase', SUCCESS)
        .set('user', payload)
        .set('isSuccess', payload.status)
        .set('message', payload.message)  
        .set('loginError', null)  
      }else{
      return state
        .set('loginPhase', ERROR)
        .set('loginError',payload.message)
      }
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      // console.log(payload)
      return state.set('loginError', payload.error).set('loginPhase', ERROR)
    }

    case GET_USER: {
      return state.set('userPhase', LOADING).set('error', null)
    }

    case GET_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('userPhase', SUCCESS)
        .set('user', payload.data)
        .set('error', null)
    }

    case GET_USER_ERROR: {
      return state.set('userPhase', ERROR).set('user', {}).set('error', null)
    }

    case UPDATE_USER: {
      return state.set('updateUserPhase', LOADING).set('error', null)
    }

    case UPDATE_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('updateUserPhase', SUCCESS)
        .set('message', payload.message)
        .set('error', null)
    }

    case UPDATE_USER_ERROR: {
      return state.set('updateUserPhase', ERROR).set('error', null)
    }

    case NOTIFY_USER: {
      return state.set('notifyPhase', LOADING).set('error', null)
    }

    case NOTIFY_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('notifyPhase', SUCCESS)
        .set('error', null)
        .set('isSuccess', payload.status)
        .set('message', payload.message)
    }

    case NOTIFY_USER_ERROR: {
      return state.set('notifyPhase', ERROR).set('error', null)
    }

    case FORGOT_USER: {
      return state.set('forgotPhase', LOADING).set('error', null)
    }

    case FORGOT_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('forgotPhase', SUCCESS)
        .set('error', null)
        .set('isSuccess', payload.status)
        .set('message', payload.message)
    }

    case FORGOT_USER_ERROR: {
      return state.set('forgotPhase', ERROR).set('error', null)
    }

    case RESET_USER: {
      return state.set('resetPhase', LOADING).set('error', null)
    }

    case RESET_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('resetPhase', SUCCESS)
        .set('error', null)
        .set('isSuccess', payload.status)
        .set('message', payload.message)
    }

    case RESET_USER_ERROR: {
      return state.set('resetPhase', ERROR).set('error', null)
    }

    case CLEAR_PHASE: {
      return state
        .set('loginPhase', INIT)
        .set('forgotPhase', INIT)
        .set('resetPhase', INIT)
        .set('notifyPhase', INIT)
        .set('userPhase', INIT)
        .set('signupPhase', INIT)
        .set('updateUserPhase', INIT)
        .set('message', '')
    }

    case USER_LOGOUT: {
      window.localStorage.clear()
      return state.set('user', {})
    }

    default: {
      return state
    }
  }
}

/***********************************
 * Action Creators
 ***********/

export const signupUser = data => {
  return {
    type: SIGNUP_USER,
    payload: data
  }
}

export const getUser = credentials => {
  return {
    type: GET_USER,
    payload: credentials
  }
}


export const loginUser = (email,password,role) => {
  // console.log(credentials);
  const credentials={
    email,password,role
  }
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const updateUser = data => {
  return {
    type: UPDATE_USER,
    payload: data
  }
}

export const notifyUser = data => {
  return {
    type: NOTIFY_USER,
    payload: data
  }
}

export const forgotUser = data => {
  return {
    type: FORGOT_USER,
    payload: data
  }
}

export const resetUser = data => {
  return {
    type: RESET_USER,
    payload: data
  }
}

export const userClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

export const logout = data => {
  // console.log("data",data)
  return {
    type: USER_LOGOUT,
    payload: data
  }
}

/***********************************
 * Epics
 ***********************************/

const loginUserEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action => {
      return fromPromise(api.loginUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: LOGIN_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: LOGIN_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const signupUserEpic = action$ =>
  action$.pipe(
    ofType(SIGNUP_USER),
    mergeMap(action => {
      return fromPromise(api.signupUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: SIGNUP_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: SIGNUP_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getUserEpic = action$ =>
  action$.pipe(
    ofType(GET_USER),
    mergeMap(action => {
      return fromPromise(api.getUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updateUserEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_USER),
    mergeMap(action => {
      return fromPromise(api.updateUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: UPDATE_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: UPDATE_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const notifyUserEpic = action$ =>
  action$.pipe(
    ofType(NOTIFY_USER),
    mergeMap(action => {
      return fromPromise(api.notifyUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: NOTIFY_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: NOTIFY_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const forgotUserEpic = action$ =>
  action$.pipe(
    ofType(FORGOT_USER),
    mergeMap(action => {
      return fromPromise(api.forgotUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: FORGOT_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: FORGOT_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const resetUserEpic = action$ =>
  action$.pipe(
    ofType(RESET_USER),
    mergeMap(action => {
      return fromPromise(api.resetUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: RESET_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: RESET_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const userEpic = combineEpics(
  loginUserEpic,
  signupUserEpic,
  getUserEpic,
  updateUserEpic,
  notifyUserEpic,
  forgotUserEpic,
  resetUserEpic
)
