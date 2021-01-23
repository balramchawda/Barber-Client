import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown } from 'antd';
import '../../scss/header.scss'
import { logout } from '../../store/user/duck'
import { connect } from 'react-redux';

import { Link,withRouter } from "react-router-dom";
const { Header } = Layout
// import { setLoggeedInUser,getLoggedInUser,removeLoggedInUser,postLogin } from '../helpers/authUtils';


class HeaderComponent extends Component {

  static propTypes = {
    // PropTypes go here
  }

  componentDidUpdate = async (prevProps, prevState) => {
    // this.props.userClearPhase()
  }

 
  logout() {
    this.props.logout()
    this.setState({ visible: false }, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1"><Link to="#">Profile</Link></Menu.Item>
        <Menu.Item key="2" onClick={this.logout.bind(this)}>Logout</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="w-100">
              <div className="dashboard_wrap_header-admin">
                <ul>
                  <li>
                    <div className="logo_dashboard_wrap">
                      <Link to="/admin/dashboard" ><img src="/images/Trim_artboard.png" alt="" /></Link>
                    </div>
                    {/*<div className="notify_setting_wrap">
                      <i className="fas fa-bell"></i>
                      <i className="fas fa-cog"></i>
                    </div>*/}
                  </li>
                  <li>
                    <div className="admin_wrap">
                      <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                        <p>Admin<img src="/images/profile.png" alt="" /><i className="fas fa-caret-down"></i></p>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Layout className="sub_header_dashboard-admin">
            <Header>
              <Menu
                theme="light"
                mode="horizontal"
                overflowedIndicator={<i className="fa fa-list"></i>}
                defaultSelectedKeys={[this.props.location.pathname]}
                selectedKeys={[this.props.location.pathname]}
              > 
                <Menu.Item key="/admin/dashboard">
                  <Link to="/admin/dashboard">Home</Link>
                </Menu.Item>
                <Menu.Item key="/admin/customers">
                  <Link to="/admin/customers">Customers</Link>
                </Menu.Item>
                <Menu.Item key="/admin/barbers">
                  <Link to="/admin/barbers">Barbers</Link>
                </Menu.Item>
                <Menu.Item key="/admin/service-categories">
                  <Link to="/admin/service-categories">Service-Category</Link>
                </Menu.Item>
                <Menu.Item key="/admin/subscription">
                  <Link to="/admin/subscription">Subscription</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => {
      const { user } = state.user;
      return { user };
}

export default withRouter(connect(mapStatetoProps,{logout})(HeaderComponent));