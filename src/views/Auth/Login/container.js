
import { connect } from 'react-redux'
import { loginUser,userClearPhase } from '../../../store/user/duck'
// import { handleSignOut } from '../../store/user/duck'
import LoginPage from './component'

const LoginContainer = connect(
  // Map state to props
  state => ({
    message: state.user.message,
    user: state.user.user,
    loginPhase: state.user.loginPhase,
    isSuccess: state.user.isSuccess,
    loginError:state.user.loginError
  }),
  {
    loginUser,
    userClearPhase
  }
)(LoginPage)

export default LoginContainer
