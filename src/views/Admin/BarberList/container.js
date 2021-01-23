import { connect } from 'react-redux'
import { getBarberData , updateBarberStatus,adminClearPhase } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import BarberList from './component'

const BarberListContainer = connect(
  // Map state to props
  state => ({
    barberPhase: state.admin.barberPhase,
    barberData: state.admin.barberData,
    message:state.admin.message,
    isSuccess:state.admin.isSuccess,
    updateBarberPhase:state.admin.updateBarberPhase
    // impersonatePhase: state.admin.impersonatePhase,
  }),
  // Map actions to dispatch and props
  {
    getBarberData,
    updateBarberStatus,
    adminClearPhase
    // resetAdmin,
    // userImpersonate,
    // handleSignOut
  }
)(BarberList)

export default BarberListContainer
