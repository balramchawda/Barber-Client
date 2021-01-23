import { connect } from 'react-redux'
import { getCategoryData,addServiceCategory,updateCategoryStatus,adminClearPhase } from '../../../store/admin/duck'
// import { handleSignOut } from '../../store/user/duck'
import ServiceCategory from './component'

const ServiceCategoryContainer = connect(
  // Map state to props
  state => ({
    addCategoryPhase: state.admin.addCategoryPhase,
    categoryData: state.admin.categoryData,
    categoryPhase:state.admin.categoryPhase,
    addCategoryPhase:state.admin.addCategoryPhase,
    updateCategoryPhase:state.admin.updateCategoryPhase
    // message:state.admin.message
    // impersonatePhase: state.admin.impersonatePhase,
  }),
  // Map actions to dispatch and props
  {
    getCategoryData,
    addServiceCategory,
    updateCategoryStatus,
    adminClearPhase
    // resetAdmin,
    // userImpersonate,
    // handleSignOut
  }
)(ServiceCategory)

export default ServiceCategoryContainer
