import React, { Component } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

// import Homepage from '../Homepage/container'
import Login from '../Auth/Login/container'
import AdminDashboard from '../Admin/dashboard'
import CustomerList from '../Admin/CustomerList/container';
import BarberList from '../Admin/BarberList/container'
import ServiceCategory from '../Admin/ServiceCategory/container'
import PaymentHistory from '../Admin/PaymentHistory/container'
import ForgotPassword from '../Auth/Forgot-Password/container'
import UpdatePassword from '../Auth/UpdatePassword/container'
import ViewBarberProfile from '../Admin/ViewBarberProfile/container'
import ViewCustomerProfile from '../Admin/ViewCustomerProfile/container'
import TermsAndConditions from '../TermsAndConditions/component'
import Subscription from '../Admin/Subscription/container'
import EditSubscription from '../Admin/EditSubscription/container'
import Home from '../Home/home'
import Layout from '../../components/Layout';
import history from './history'
import './styles.scss';
const PrivateRoute = ({ component, ...rest }) => {
  const user = window.localStorage.getItem('authToken')
  const isAuthed = user ? true : false
  return (
    <Route
      {...rest}
      exact
      render={props =>
        isAuthed ? (
          <div>{React.createElement(component, props)}</div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component { 
    render() {
      return <Layout>
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func]).isRequired,
  location: PropTypes.object
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="application-container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/terms_conditions" component={TermsAndConditions} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/update-password/:email" component={UpdatePassword} />
            <PrivateRoute path={"/admin/dashboard"} component={withLayout(AdminDashboard)} />
            <PrivateRoute path={"/admin/customers"} component={withLayout(CustomerList)} />
            <PrivateRoute path={"/admin/barbers"} component={withLayout(BarberList)} />
            <PrivateRoute path={"/admin/service-categories"} component={withLayout(ServiceCategory)} />
            {/*<PrivateRoute path={"/admin/customer-details/:userId"} component={withLayout(ViewCustomerProfile)} />
            <PrivateRoute path={"/admin/barber-details/:userId"} component={withLayout(ViewBarberProfile)} />
            // <PrivateRoute path={"/admin/payment-history"} component={withLayout(PaymentHistory)} />          
            */}
            <PrivateRoute path={"/admin/subscription"} component={withLayout(Subscription)} />
            <PrivateRoute path="/admin/customer-details/:userId" component={ViewCustomerProfile}  />
            <PrivateRoute path={"/admin/barber-details/:userId"} component={ViewBarberProfile}   />
            <PrivateRoute path={"/admin/edit-subscription/:subscriptionId"} component={EditSubscription}  />
            </Switch>
        </div>
      </Router>
    )
  }
}
export default App
