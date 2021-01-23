import { connect } from 'react-redux'
import { getPaymentHistory ,adminClearPhase} from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import PaymentHistory from './component'

const PaymentHistoryContainer = connect(
  // Map state to props
  state => ({
    paymentHistoryPhase: state.admin.paymentHistoryPhase,
    paymentData: state.admin.paymentData,
    // message:state.admin.message
    // impersonatePhase: state.admin.impersonatePhase,
  }),
  // Map actions to dispatch and props
  {
    getPaymentHistory,
    adminClearPhase
    // resetAdmin,
    // userImpersonate,
    // handleSignOut
  }
)(PaymentHistory)

export default PaymentHistoryContainer
