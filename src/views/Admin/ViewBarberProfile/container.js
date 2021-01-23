import { connect } from 'react-redux'
import { getBarberProfile } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import ViewBarberProfile from './component'

const ViewBarberContainer = connect(
  // Map state to props
  state => ({
  barberDetailPhase:state.admin.barberDetailPhase,
  barberDetailData:state.admin.barberDetailData,
  paymentData:state.admin.paymentData
  }),
  // Map actions to dispatch and props
  {
    getBarberProfile
  }
)(ViewBarberProfile)

export default ViewBarberContainer
