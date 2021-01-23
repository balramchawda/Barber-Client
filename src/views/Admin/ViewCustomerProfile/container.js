import { connect } from 'react-redux'
import { getCustomerProfile } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import ViewCustomerProfile from './component'

const ViewCustomerContainer = connect(
  // Map state to props
  state => ({
  customerDetailPhase:state.admin.customerDetailPhase,
  customerDetailData:state.admin.customerDetailData,
  paymentData:state.admin.paymentData
  }),
  // Map actions to dispatch and props
  {
    getCustomerProfile
  }
)(ViewCustomerProfile)

export default ViewCustomerContainer
