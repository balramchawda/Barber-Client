import * as Yup from 'yup'
// import moment from 'moment'
/* tslint:disable */
const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
/* tslint:enable */
// eslint-disable-next-line
var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
// eslint-disable-line

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Required')
    .required('Required'),
  userName: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required')
})


export const barberSchema = Yup.object().shape({
  email: Yup.string()
    .email('Required')
    .required('Required'),
  userName: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  userType: Yup.string()
    .required('Required'),
  address:Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  state:Yup.string()
    .required('Required'),
  aboutBusiness:Yup.string()
    .required('Required'),
  businessTypeList:Yup.string()
    .required('Required'),
  openingHours:Yup.string()
    .required('Required'),
  serviceCategoryId:Yup.string()
    .required('Required')
})

export const forgetPasswordSchema= Yup.object().shape({
  email: Yup.string()
    .email('Required')
    .required('Required')
  })

export const EditSubscriptionSchema=Yup.object().shape({
    planName: Yup.string()
    .required('Required'),
    days: Yup.string()
    .required('Required'),
    price: Yup.string()
    .required('Required'),
    userType: Yup.string()
    .required('Required')
})