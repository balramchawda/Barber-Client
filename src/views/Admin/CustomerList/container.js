import { connect } from 'react-redux'
import { getCustomerData , updateCustomerStatus ,adminClearPhase} from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import CustomerList from './component'

const CustomerListContainer = connect(
  // Map state to props
  state => ({
    customerPhase: state.admin.customerPhase,
    customerData: state.admin.customerData,
    message:state.admin.message,
    isSuccess:state.admin.isSuccess,
    updateCustomerPhase:state.admin.updateCustomerPhase,
    // impersonatePhase: state.admin.impersonatePhase,
  }),
  // Map actions to dispatch and props
  {
    getCustomerData,
    updateCustomerStatus,
    adminClearPhase
    // resetAdmin,
    // userImpersonate,
    // handleSignOut
  }
)(CustomerList)

export default CustomerListContainer
