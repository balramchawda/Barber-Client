import { connect } from 'react-redux'

import AppComponent from './component'

const AppContainer = connect(
  // Map state to props
  state => ({
    user: state.user.user
  }),
  // Map actions to dispatch and props
)(AppComponent)
export default AppContainer
