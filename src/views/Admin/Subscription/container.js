import { connect } from 'react-redux'
import { getSubscriptionData,updateSubscriptionDetails,getSubscriptionById,addSubscription,updateSubscriptionStatus,adminClearPhase } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import Subscription from './component'

const SubscriptionContainer = connect(
  // Map state to props
  state => ({
    subscriptionData: state.admin.subscriptionData,
    subscriptionPhase:state.admin.subscriptionPhase,
    addSubscriptionPhase:state.admin.addSubscriptionPhase,
    updateSubscriptionPhase:state.admin.updateSubscriptionPhase,
    updateSubsDetailsPhase:state.admin.updateSubsDetailsPhase,
  subscriptionDetailPhase:state.admin.subscriptionDetailPhase,
  subscriptionDetailData:state.admin.subscriptionDetailData,
  }),
  // Map actions to dispatch and props
  {
    getSubscriptionData,
    addSubscription,
    updateSubscriptionStatus,
    adminClearPhase,
    getSubscriptionById,
    updateSubscriptionDetails
  }
)(Subscription)

export default SubscriptionContainer
