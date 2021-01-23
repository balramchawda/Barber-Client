import { connect } from 'react-redux'
import { resetUser, userClearPhase } from '../../../store/user/duck'
import UpdatePasswordComponent from './component'

const UpdatePasswordContainer = connect(
  // Map state to props
  state => ({
  	resetPhase: state.user.resetPhase,
  	isSuccess: state.user.isSuccess,
    message:state.user.message
  }),
  // Map actions to dispatch and props
  {
  	resetUser,
  	userClearPhase
  }
)(UpdatePasswordComponent)

export default UpdatePasswordContainer
