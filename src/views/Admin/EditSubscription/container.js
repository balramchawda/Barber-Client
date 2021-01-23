import { connect } from 'react-redux'
import { updateSubscriptionDetails,getSubscriptionById } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import EditSubscription from './component'

const EditSubscriptionContainer = connect(
  // Map state to props
  state => ({
  updateSubsDetailsPhase:state.admin.updateSubsDetailsPhase,
  subscriptionDetailPhase:state.admin.subscriptionDetailPhase,
  subscriptionDetailData:state.admin.subscriptionDetailData,
  }),
  // Map actions to dispatch and props
  {
    getSubscriptionById,
    updateSubscriptionDetails
  }
)(EditSubscription)

export default EditSubscriptionContainer
