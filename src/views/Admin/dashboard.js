
import React, { Component } from 'react'
import { Link,withRouter } from "react-router-dom"
import { Spin,Icon } from 'antd'
import { setLoggeedInUser,getLoggedInUser,removeLoggedInUser,postLogin } from '../../helpers/authUtils';
import { connect } from 'react-redux';
import { Alert, Button, Col, Row, Card } from 'reactstrap';
import API from '../../utils/API.js';
import _ from 'lodash'
import '../../scss/adminDashboard.scss'
const API_URL=process.env.REACT_APP_API_HOSTNAME;
class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = 
    {
      Data:{
      TotalUsers : '',
      TotalBarbers : '',
      TotalSubscriptionPlan : '',
      TotalServiceCategories : '',
      TotalNewsLetter : '',
      TotalContactInfo : '',
      loading: false
    }
  }
  }
componentWillReceiveProps(recieveProps) {
  // console.log(recieveProps.user);
const {  isSuccess,message} = recieveProps
    if (isSuccess) {
    this.setState({
      loading:true
    })
      // this.props.history.push('/admin/dashboard')
    } else {
      this.setState({ message })
    }  
  }

  componentDidMount(){    
    const {Data,TotalServiceCategories,TotalBooking,TotalUsers,TotalBarbers}=this.state;
     API.get(API_URL+'/admin/getAdminDashbardData').then(response=>{
          var data=response.data;
          console.log(data);
          this.setState({
            TotalUsers : data.totalUser,
            TotalBarbers:data.totalBarber,
            TotalSubscriptionPlan:data.totalSubscriptionPlan,
            TotalServiceCategories:data.totalServiceCategory
          })    
          })
  }

  render() {
    // const {getAdminData}=this.props;
    const { 
      TotalContactInfo,
      TotalServiceCategories, 
      TotalNewsLetter, 
      TotalSubscriptionPlan, 
      TotalBarbers, 
      TotalUsers
    } = this.state
    
    return (
      <React.Fragment>
      <div>

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="home_dashboard_wrap">
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/customers" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalUsers}+</p>
                          <p>Customers</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairtype.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/barbers" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalBarbers}+</p>
                          <p>Barbers</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Hairstylist.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/service-categories" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalServiceCategories}+</p>
                          <p>Service Category</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Salon_icon.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/subscription" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalSubscriptionPlan}+</p>
                          <p>Subscription</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Subscribe.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    {/*<div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/payment-history" ><div className="box_wrap">
                        <div className="content">
                          <p>{TotalBooking}+</p>
                          <p>Payment History</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/User_male.png" alt="" />
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/news-letter" ><div className="box_wrap">
                      <div className="content">
                          <p>{TotalNewsLetter}+</p>
                          <p>News Letter</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Newsletter.png" alt=""/>
                        </div>
                      </div></Link>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <Link to="/admin/contact-info" ><div className="box_wrap">
                      <div className="content">
                          <p>{TotalContactInfo}+</p>
                          <p>Contact Info</p>
                        </div>
                        <div className="img_wrap">
                          <img src="/images/Contact_info.png" alt=""/>
                        </div>
                      </div></Link>
                    </div>
                  
                <div className="row">
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-xl-6">
                    <div className="wrapper_content_box">
                      <p className="title_wrap">Title</p>
                    </div>
                  </div>
                </div>*/}
              </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </React.Fragment>    
    )
  }
}

const mapStatetoProps = state => {
    const { user,isSuccess,loading } = state.user;
    return { user,isSuccess,loading };
}

export default withRouter(connect(mapStatetoProps,{})(AdminDashboard));
