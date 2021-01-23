import React, { PureComponent } from 'react'
import { message } from 'antd'
import { Alert, Button, Col, Row, Card } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {_,get} from 'lodash'
import { Link ,withRouter} from "react-router-dom"
import {loginSchema} from '../../../utils/validations.js'
import { Redirect } from 'react-router';

import './styles.scss';
// import '../../scss/signup.scss'

export default class LoginPage extends PureComponent {
  constructor(props) {
    super(props)
    // this.setInterval = this.setInterval.bind(this);
    this.state = {
      email: '',
      password: '',
      tabIndex: 0,
      message:''
    }
   // this.handleSubmit=this.handleSubmit.bind(this);
  } 
componentDidMount() {
    const user = localStorage.getItem('authToken')
    if (user && user !== 'undefined') {
      this.props.history.push('/login')
    }
    document.title = 'Login | Barber App'
  }

componentWillReceiveProps(recieveProps) {
  // console.log(recieveProps);
const { loginPhase, isSuccess, message } = recieveProps
    if (loginPhase === 'success' && isSuccess) {
      this.props.history.push('/admin/dashboard')
    } else {
      this.setState({ message:message })   
      // console.log(this.state.message);         
    }  
  }

  handleUser1 = async values => {
    await this.props.loginUser(values.email, values.password,"ADMIN"); 
  }

  handleEnter = async(values, event) => {
    var code = event.keyCode || event.charCode
    if (code === 13){
      this.handleUser1(values)
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div className="login">
        <div className="login_wrap">
          <div className="logo_wrap">
            <Link to="/home" ><img src="/images/Trim_white_artboard.png" alt="" /></Link>
          </div>
          <i
            className="fa fa-close close_page"
            onClick={() => {
              this.props.history.push('/')
            }}
          ></i>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section__title">
                  <h2>Login</h2>
                  <p>Welcome to our world</p>
                </div>
        {this.props.loginError && <Alert color="danger">
                                {this.props.loginError}</Alert>}  
                                                <div className="login_form">
                  <Formik
                    initialValues={{
                      email: '',
                      password: ''
                    }}
                    enableReinitialize
                    validationSchema={loginSchema}
                    onSubmit={this.handleUser1}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      errors,
                      setFieldValue,
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <Form>
                        <div className="profile_img_wrap">
                          <img
                            src="/images/profile.png"
                            className="profile_img"
                            alt=""
                          />
                        </div>
                        <div className="form-group">
                          <label className="label_form"> Email* </label>
                          <Field
                            name="email"
                            type="email"
                            className="form-control input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email || ''}
                            placeholder="example@example.com"
                          />
                          <ErrorMessage name="email" component="span" />
                        </div>
                        <div className="form-group">
                          <label className="label_form"> Password* </label>
                          <Field
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password || ''}
                            className="form-control input"
                            placeholder="Password here"
                            onKeyPress={this.handleEnter.bind(this, values)}
                          />
                          <ErrorMessage name="password" component="span" />
                        </div>
                        <div className="btn_wrap">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-lg btn_login"
                          >
                            Login
                          </button>
                        </div>
                        <p className="footer_login">
                          <a href="/forgot-password">Forget password</a> 
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


