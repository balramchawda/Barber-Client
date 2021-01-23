import React, { PureComponent } from "react";

import {
  List,
  Modal,
  Select,
  Avatar,
  Pagination,
  Spin,
  Switch,
  Table,
  Tag,
  Space,
} from "antd";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Link, withRouter } from "react-router-dom";
import "./styles.scss";

export default class ServiceCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      serviceName: "",
      userType: "",
      categoryData: "",
      text: "",
      page: 0,
      imageUrl: {},
      imageUrlData: "",
    };
    this.handleOk = this.handleOk.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    // this.convertBase64=this.convertBase64.bind(this)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }
  componentDidMount() {
    var data = {
      page: 0,
      text: "",
    };

    this.props.getCategoryData(data);
  }
  componentWillReceiveProps(receiveProps) {
    if (receiveProps.addCategoryPhase == "success") {
      this.setState({
        visible: false,
      });
      message.success("Added new category successfully.");
      this.componentDidMount();
    }
    if (receiveProps.categoryPhase == "success") {
      this.setState({
        categoryData: receiveProps.categoryData,
      });
    }
    this.props.adminClearPhase();
  }
  handleOk(e) {
    // console.log('sss');
    const { serviceName, userType, imageUrl } = this.state;
    var data = {
      categoryName: serviceName,
      userType: userType,
      image: imageUrl,
    };
    // console.log(data);
    this.props.addServiceCategory(data);
  }
  onChange1(e) {
    this.setState({
      serviceName: e.target.value,
    });
    // console.log(`selected ${value}`);
  }
  onChange(value) {
    this.setState({
      userType: `${value}`,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
      serviceName: "",
      userType: "",
      imageUrl: "",
    });
  };
  searchUsersData(e) {
    this.setState({ text: e.target.value });
    const payload = {
      text: e.target.value,
    };
    this.props.getCategoryData(payload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateCategoryPhase === "success") {
      this.componentDidMount();
    } else {
      // message.error('Invalid email id')
    }
    this.props.adminClearPhase();
  }
  updateStatus(status, id) {
    var categoryId = id._id;
    const data = {
      categoryId: categoryId,
    };
    this.props.updateCategoryStatus(data);
  }

  handleChangeFile = async (e) => {
    // console.log(e.target.files[0]);
    var file = e.target.files[0];
    let self = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      var fileEncoded = {
        base64Code: encoded,
        filename: file.name,
      };
      self.setState({ imageUrl: fileEncoded, imageUrlData: reader.result });
      // console.log(base64StringFile);
      reader.readAsDataURL(file);
    };

    reader.onerror = function (error) {
      console.log(error);
    };
  };
  render() {
    const { Option } = Select;
    const { userType, serviceName, categoryData, imageUrlData } = this.state;
    function onBlur() {
      console.log("blur");
    }

    function onFocus() {
      console.log("focus");
    }

    function onSearch(val) {
      console.log("search:", val);
    }
    const columns = [
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        render: (imageUrl) => <Avatar src={imageUrl} />,
      },
      {
        title: "Category Name",
        dataIndex: "serviceCategoryName",
        key: "serviceCategoryName",
        render: (text) => <a>{text}</a>,
      },

      {
        title: "User Type",
        dataIndex: "userType",
        key: "userType",
      },
      {
        title: "Action",
        dataIndex: "status",
        key: "status",
        render: (status, _id) => (
          <Switch
            checked={status}
            onClick={() => this.updateStatus(status, _id)}
          />
        ),
      },
    ];
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="category_main_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="service_category_wrapper">
                <button type="button" onClick={this.showModal}>
                  ADD CATEGORY
                </button>
                <Modal
                  title="Service Category"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  className="modal_service"
                  footer={[
                    <button
                      key="back"
                      className="btn btn_return"
                      onClick={this.handleCancel}
                    >
                      Return
                    </button>,
                    <button
                      key="submit"
                      className="btn btn_submit"
                      type="button"
                      onClick={this.handleOk}
                    >
                      Submit
                    </button>,
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
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="individual">Individual</Option>
                      <Option value="business">Business</Option>
                    </Select>
                  </div>
                  <div className="field_wrap form-group">
                    <label>Service Category Name</label>
                    <input
                      type="text"
                      className="form-control input_modal"
                      placeholder="Service"
                      onChange={this.onChange1.bind(this)}
                      name="serviceName"
                    />
                  </div>

                  {/*<div className="profile_img_wrap">
                              {imageUrlData ? <img
                                src={imageUrlData}
                                className="profile_img"
                                alt=""
                              />:
                          <input type="file" onChange={this.handleChangeFile} placeholder="Upload Image" />}
                            </div>*/}
                  <div>
                    <label>Upload Image</label>
                    <div className="uploader_wrap">
                      <div className="upload_sub_wrap">
                        <span>
                          {imageUrlData ? (
                            <img
                              src={imageUrlData}
                              className="profile_img"
                              alt=""
                            />
                          ) : (
                            <input
                              type="file"
                              onChange={this.handleChangeFile}
                              placeholder="Upload Image"
                            />
                          )}
                        </span>
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
                        dataSource={categoryData}
                        pagination={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
