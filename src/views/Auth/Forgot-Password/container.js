

import { connect } from 'react-redux'
import { forgotUser, userClearPhase } from '../../../store/user/duck'
import ForgotPassword from './component'

const ForgotPasswordContainer = connect(
  // Map state to props
  state => ({
   message: state.user.message,
    forgotPhase: state.user.forgotPhase,
    isSuccess: state.user.isSuccess
  }),
  // Map actions to dispatch and props
  {
    forgotUser,
    userClearPhase
  }
)(ForgotPassword)

export default ForgotPasswordContainer
