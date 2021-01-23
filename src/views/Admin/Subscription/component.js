import React, { PureComponent } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { EditSubscriptionSchema } from '../../../utils/validations'

import { List, Select, Modal, Spin, message, Upload, Avatar, Collapse, Pagination, Switch, Table, Tag, Space } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, withRouter } from "react-router-dom"
import './styles.scss';

export default class Subscription extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      visibleEdit: false,
      planName: '',
      userType: '',
      price: '',
      days: '',
      subscriptionData: '',
      text: '',
      page: 0,
      buttonDisable: false,
      button: true,
      subscriptionDetailData: '',
      planName: '',
      userType: '',
      price: '',
      days: '',
      planDisplayName:'',
      id: ''
    }
    this.handleOk = this.handleOk.bind(this)
    this.onChange1 = this.onChange1.bind(this)
    // this.convertBase64=this.convertBase64.bind(this)
  }
  handleEditData(values) {
    this.setState({ buttonDisable: true, button: false, fullPageLoading: true })
    const data = {}
    data.subscriptionId = this.state.id;
    data.userType = _.get(values, 'userType', '');
    data.planName = _.get(values, 'planName', '');
    data.price = _.get(values, 'price', '');
    data.days = _.get(values, 'days', '');
    data.planDisplayName = _.get(values, 'planDisplayName', '');
    this.props.updateSubscriptionDetails(data)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showEditModal = (id) => {
    console.log(id);
    this.setState({
      visibleEdit: true,
      id: id
    });
    this.props.getSubscriptionById({ subscriptionId: id });

  };
  componentDidMount() {
    var data = {
      page: 0,
      text: ''
    }
    this.props.getSubscriptionData(data)
  }
  componentWillReceiveProps(receiveProps) {
    if (receiveProps.addSubscriptionPhase == "success") {
      this.setState({
        visible: false,
        // visibleEdit: true,
      });
      message.success('Added new subscription plan successfully.')
      this.componentDidMount()
    }
    if (receiveProps.subscriptionPhase == "success") {
      this.setState({
        subscriptionData: receiveProps.subscriptionData
      });
    }
    const { subscriptionDetailPhase, subscriptionDetailData, updateSubsDetailsPhase } = receiveProps;
    console.log(receiveProps)
    if (receiveProps.subscriptionDetailPhase == "success") {
      this.setState({
        subscriptionDetailData: subscriptionDetailData
      })
      this.setState({
        planDisplayName:_.get(receiveProps,'subscriptionDetailData.planDisplayName',''),
        subscriptionId: _.get(receiveProps, 'subscriptionDetailData._id', ''),
        planName: _.get(receiveProps, 'subscriptionDetailData.planName', ''),
        days: _.get(receiveProps, 'subscriptionDetailData.days', ''),
        userType: _.get(receiveProps, 'subscriptionDetailData.userType', ''),
        price: _.get(receiveProps, 'subscriptionDetailData.price', '')
      })
    }
    if (receiveProps.updateSubsDetailsPhase == "success") {
      this.setState({ buttonDisable: false, button: true, fullPageLoading: false })
      message.success('Updated Successfully')
      // setTimeout(()=>{
      //   this.props.history.push('/admin/subscription')
      // },2000)
      this.setState({
        visibleEdit: false
      })
      this.componentDidMount()
    }
    this.props.adminClearPhase();
  }
  handle_SelectChanged = (selectGroups, setFieldValue, value) => {
    setFieldValue(value, selectGroups)
  }

  handleOk(e) {
    // console.log('sss');
    const { planName, price, days, userType ,planDisplayName} = this.state;
    var data = { planName: planName,planDisplayName:planDisplayName, days: days, price: price, userType: userType }
    console.log(data);
    this.props.addSubscription(data);

  };
  onChange1(value) {
    this.setState({
      planName: `${value}`
    })
    // console.log(`selected ${value}`);
  }
  onChange111(e) {
    this.setState({
      planDisplayName: e.target.value
    })
    // console.log(`selected ${value}`);
  }
  onChange(value) {
    this.setState({
      userType: `${value}`
    })
  }
  onChange2(e) {
    console.log(e.target.value);
    this.setState({
      price: e.target.value
    })
  }
  onChange3(e) {
    this.setState({
      days: e.target.value
    })
  }
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
      visibleEdit: true,
      planName: '',
      userType: '',
      days: '',
      price: ''
    });
  };
  searchUsersData(e) {
    this.setState({ text: e.target.value })
    const payload = {
      text: e.target.value
    }
    this.props.getSubscriptionData(payload)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateSubscriptionPhase === "success") {
      this.componentDidMount();
    } else {
      // message.error('Invalid email id')
    }
    this.props.adminClearPhase();
  }
  updateStatus(status, id) {
    var subscriptionId = id._id;
    const data = {
      subscriptionId: subscriptionId,
    }
    this.props.updateSubscriptionStatus(data)
  }
  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleEdit: false,
  //   });
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleEdit: false,
  //   });
  // };
  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //     visibleEdit: false,
  //   });
  // };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      visibleEdit: false,
    });
  };
  render() {
    const userTypeData = [{ id: 1, name: "individual" }, { id: 2, name: "business" }]
    const planTypeData = [{ id: 1, name: "Free" }, { id: 2, name: "Paid" }]
    const { subscriptionDetailData, subscriptionId } = this.state;

    let userTypeOption = userTypeData && userTypeData.map((item, index) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      )
    }, this)
    let planTypeOption = planTypeData && planTypeData.map((item, index) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      )
    }, this)
    const { Option } = Select;
    const { userType,planDisplayName, planName, days, price, subscriptionData } = this.state;
    function onBlur() {
      console.log('blur');
    }

    function onFocus() {
      console.log('focus');
    }

    function onSearch(val) {
      console.log('search:', val);

    }
    const columns = [
      {
        title: 'Plan Display Name',
        dataIndex: 'planDisplayName',
        key: 'planDisplayName',
      },
      {
        title: 'Plan Name',
        dataIndex: 'planName',
        key: 'planName',
        render: text => <a>{text}</a>,
      },
      {
        title: 'User Type',
        dataIndex: 'userType',
        key: 'userType',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, data) => <p>${_.get(data, 'price', '')}</p>,
      },
      {
        title: 'Days',
        dataIndex: 'days',
        key: 'days',
      },
      {
        title: 'Action',
        dataIndex: 'status',
        key: 'status',
        render: (status, _id) => <Switch checked={status} onClick={() => this.updateStatus(status, _id)} />
      },
      {
        title: 'Edit',
        dataIndex: '_id',
        key: '_id',
        render: (_id, data) => <button type="button" className="btn_edit" onClick={() => this.showEditModal(_id)}>
          Edit Subscription
      </button>
        // <Link to={`/admin/edit-subscription/${_id}`} className="btn_more">Edit Subscription</Link>
      }
    ]
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // const { imageUrl } = this.state;
    return (
      <div className="category_main_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="service_category_wrapper">
                <button type="button" onClick={this.showModal}>ADD SUBSCRIPTION</button>
                <Modal
                  title="Subscription"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  className="modal_service"
                  footer={[
                    <button key="back" className="btn btn_return" onClick={this.handleCancel}>Return</button>,
                    <button key="submit" className="btn btn_submit" type="button" onClick={this.handleOk}>Submit</button>,
                  ]}
                >
                  <div className="field_wrap">
                    <label>User Type</label>
                    {/* <Select
                      showSearch
                      placeholder="Select User Type"
                      optionFilterProp="children"
                      onChange={this.onChange.bind(this)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      className="modal_select"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="individual">Individual</Option>
                      <Option value="business">Business</Option>
                    </Select> */}
                    <Select
                      showSearch
                      placeholder="Select User Type"
                      optionFilterProp="children"
                      onChange={this.onChange.bind(this)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      className="select_type"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="individual">Individual</Option>
                      <Option value="business">Business</Option>
                    </Select>
                  </div>
                   <div className="field_wrap form-group">
                    <label>Plan Display Name</label>
                    <input type="text" className="form-control input_modal" placeholder="Enter Plan Display Name" onChange={this.onChange111.bind(this)} name="planDisplayName" />
                  </div>
                  {/*<div className="field_wrap form-group">
                                      <label>Plan Name</label>
                                      <input type="text" className="form-control input_modal" placeholder="Enter Plan Name" onChange={this.onChange1.bind(this)} name="planName" />
                                    </div>*/}
                  <div className="field_wrap">
                    <label>Plan Name</label>
                    
                    <Select
                      showSearch
                      placeholder="Select Plan Name"
                      optionFilterProp="children"
                      onChange={this.onChange1.bind(this)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      className="select_type"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Free">Free</Option>
                      <Option value="Paid">Paid</Option>
                    </Select>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="field_wrap form-group">
                        <label>Price</label>
                        <input type="text" className="form-control input_modal" placeholder="Enter Price" onChange={this.onChange2.bind(this)} name="price" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field_wrap form-group">
                        <label>Days</label>
                        <input type="text" className="form-control input_modal" placeholder="Enter days" onChange={this.onChange3.bind(this)} name="days" />
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="user_list_wrapper">
                      <div className="search_wrapper">
                        <form className="form-inline">
                          <div className="form-group mr-3">
                            <input
                              onChange={this.searchUsersData.bind(this)}
                              type="text"
                              className="form-control search_input"
                              placeholder="Search"
                            />
                          </div>
                        </form>
                      </div>
                      <Table
                        columns={columns}
                        dataSource={subscriptionData}
                        pagination={true}
                      />
                      <Modal
                        title="Edit Subscription Plan"
                        visible={this.state.visibleEdit}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={false}
                        className="modal_service"
                      >
                        <div className="login_form">
                          <Formik
                            initialValues={{
                              planDisplayName:this.state.planDisplayName,
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
                                      <div className="field_wrap">
                                        <label>{' '}User type {' '}</label>
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
                                    <li>
                                      <div className="field_wrap form-group">
                                        <label> {' '}Plan Display Name*{' '}</label>
                                        <input name="planDisplayName"
                                          type="text"
                                          onChange={handleChange}
                                          value={values.planDisplayName || ''}
                                          className="form-control input_modal"
                                          placeholder="First Plan here" />
                                        <ErrorMessage
                                          name="planDisplayName"
                                          component="span"
                                          className="error_message"
                                        />
                                      </div>
                                    </li>
{/*                                    <li>
                                      <div className="field_wrap form-group">
                                        <label> {' '}Plan Name*{' '}</label>
                                        <input name="planName"
                                          type="text"
                                          onChange={handleChange}
                                          value={values.planName || ''}
                                          className="form-control input_modal"
                                          placeholder="First Plan here" />
                                        <ErrorMessage
                                          name="planName"
                                          component="span"
                                          className="error_message"
                                        />
                                      </div>
                                    </li>*/}
                                    <li>
                                      <div className="field_wrap">
                                        <label>{' '}Plan Name {' '}</label>
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
                                              'planName'
                                            )
                                          }
                                          value={values.planName}
                                        >
                                          {planTypeOption}
                                        </Select>
                                        <ErrorMessage
                                          name="planName"
                                          component="span"
                                          className="error_message choose_error"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="field_wrap form-group">
                                            <label> {' '}Days *{' '}</label>
                                            <input name="days"
                                              type="text"
                                              onChange={handleChange}
                                              value={values.days || ''}
                                              className="form-control input_modal"
                                              placeholder="Enter Days here" />
                                            <ErrorMessage
                                              name="days"
                                              component="span"
                                              className="error_message"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="field_wrap form-group">
                                            <label> {' '}Price *{' '}</label>
                                            <input name="price"
                                              type="text"
                                              onChange={handleChange}
                                              value={values.price || ''}
                                              className="form-control input_modal"
                                              placeholder="First Plan here" />
                                            <ErrorMessage
                                              name="price"
                                              component="span"
                                              className="error_message"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>

                                  <div className="btn_wrap">
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      disabled={this.state.buttonDisable}
                                      className="btn btn_submit"
                                    >
                                      {this.state.button ? 'Save' : 'Please wait...'}
                                    </button>
                                  </div>
                                </Form>
                              )}
                          </Formik>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
