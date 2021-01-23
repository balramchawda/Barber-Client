import React, { PureComponent } from 'react'
import _ from 'lodash'
import HeaderComponent from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
import { List,Select, Spin, message, Upload, Avatar,Collapse, Pagination, Switch, Table, Tag, Space } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {EditSubscriptionSchema} from '../../../utils/validations'
import { Link, withRouter } from "react-router-dom"
import './styles.scss';
const API_URL = process.env.REACT_APP_API_HOSTNAME;

export default class EditSubscription extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      totalLength: '',
      loading: true,
      buttonDisable:false,
      button: true,
      subscriptionDetailData:'',
      planName:'',
      userType:'',
      price:'',
      days:'',
      id:''
    }
  }
    componentDidMount() {
      var {id}=this.state;
    console.log(this.props.match.params.subscriptionId);
    var data=this.props.match.params.subscriptionId;
    // this.setState({ loading: false ,id: })
   
    // console.log("subscriptionId",subscriptionId);
    this.props.getSubscriptionById({subscriptionId:data});
  }

  handle_SelectChanged = (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  handleEditData(values) {
    this.setState({ buttonDisable : true , button : false, fullPageLoading: true })
    const data = {}
    data.subscriptionId=this.props.match.params.subscriptionId;
    data.userType=_.get(values,'userType','');
    data.planName=_.get(values,'planName','');
    data.price=_.get(values,'price','');
    data.days=_.get(values,'days','');
    this.props.updateSubscriptionDetails(data)
  }
  componentWillReceiveProps(recieveProps) {
    const {subscriptionDetailPhase,subscriptionDetailData,updateSubsDetailsPhase}=recieveProps;
    console.log(recieveProps)
    if(recieveProps.subscriptionDetailPhase=="success"){
      this.setState({
        subscriptionDetailData:subscriptionDetailData
      })
      this.setState({
          subscriptionId: _.get(recieveProps,'subscriptionDetailData._id',''),
          planName: _.get(recieveProps,'subscriptionDetailData.planName',''),
          days: _.get(recieveProps,'subscriptionDetailData.days',''),
          userType: _.get(recieveProps,'subscriptionDetailData.userType',''),
          price: _.get(recieveProps,'subscriptionDetailData.price','')
        })
    }
    if(recieveProps.updateSubsDetailsPhase=="success"){
     this.setState({ buttonDisable : false , button : true, fullPageLoading:false })
        message.success('Updated Successfully')
        setTimeout(()=>{
          this.props.history.push('/admin/subscription')
        },2000)
    }
  }
  render() {
    const userTypeData=[{id:1,name:"individual"},{id:2,name:"bussiness"}]
    const {subscriptionDetailData,subscriptionId}=this.state;
    let userTypeOption = userTypeData && userTypeData.map((item, index) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      )
    }, this)
    return (
    <div>
    <HeaderComponent />
    <div>
          <div className="edit_profile_stylist">
            <div className="edit_wrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section__title">
                      <h2>Edit Subscription plan</h2>
                    </div>
                    <div className="login_form">
                      <Formik
                        initialValues={{
                          planName: this.state.planName,
                          price: this.state.price,
                          days: this.state.days,
                          userType: this.state.userType,
                        }}
                        enableReinitialize
                        validationSchema={EditSubscriptionSchema}
                        onSubmit={this.handleEditData.bind(this)}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          setFieldValue
                        }) => (
                            <Form>
                              <ul>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Plan Name*{' '}
                                    </label>
                                    <Field
                                      name="planName"
                                      type="text"
                                      onChange={handleChange}
                                      value={values.planName || ''}
                                      className="form-control input"
                                      placeholder="First Plan here"
                                    />
                                    <ErrorMessage
                                      name="planName"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Days *{' '}
                                    </label>
                                    <Field
                                      name="days"
                                      type="text"
                                      onChange={handleChange}
                                      value={values.days || ''}
                                      className="form-control input"
                                      placeholder="Enter Days here"
                                    />
                                    <ErrorMessage
                                      name="days"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      Price *{' '}
                                    </label>
                                    <Field
                                      name="price"
                                      type="text"
                                      onChange={handleChange}
                                      value={values.price || ''}
                                      className="form-control input"
                                      placeholder="First Plan here"
                                    />
                                    <ErrorMessage
                                      name="price"
                                      component="span"
                                      className="error_message"
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="form-group">
                                    <label className="label_form">
                                      {' '}
                                      User type {' '}
                                    </label>
                                    <Select
                                      showSearch
                                      maxTagCount={1}
                                      showArrow={true}
                                      placeholder="Select"
                                      optionFilterProp="children"
                                      className="select_type"
                                      onChange={selected =>
                                        this.handle_SelectChanged(
                                          selected,
                                          setFieldValue,
                                          'userType'
                                        )
                                      }
                                      value={values.userType}
                                    >
                                      {userTypeOption}
                                    </Select>
                                    <ErrorMessage
                                      name="userType"
                                      component="span"
                                      className="error_message choose_error"
                                    />
                                  </div>
                                </li>
                                
                                </ul>
                                
                              <div className="btn_wrap">
                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  disabled={this.state.buttonDisable}
                                  className="btn btn-lg btn_edit"
                                >
                                  {this.state.button ? 'Save' : 'Please wait...'}
                                </button>
                              </div>
                            </Form>
                          )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
      <Footer/>
      </div>
    );
  }

}

