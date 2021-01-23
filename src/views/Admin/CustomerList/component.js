import React, { PureComponent } from 'react'
import { List, Avatar, Pagination, Spin, Switch, Table, Tag, Space } from 'antd'
import _ from 'lodash'
// import EmptyData from '../../Emptypage'
import { Link, withRouter } from "react-router-dom"
import './styles.scss';
const API_URL = process.env.REACT_APP_API_HOSTNAME;

export default class Customer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      UsersData: '',
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      totalLength: '',
      loading: true
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
    // this.changeData=this.changeData.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.getCustomerData({ page: this.state.page, text: this.state.text })
    // this.props.updateCustomerStatus({userId:"s23423fdslk32nklkns32"});
  }

  changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber) })
    const payload = {
      page: pageNumber,
      text: this.state.text
    }
    this.props.getCustomerData(payload)
  }
  componentWillReceiveProps(recieveProps) {
  const { customerPhase,customerData } = recieveProps
      const {loading,UsersData}=this.state;
      this.setState({
      loading:false,
      UsersData:customerData
     })
  }
  componentDidUpdate(prevProps, prevState){
    console.log(prevState)
    console.log(prevProps.updateCustomerPhase);
if(prevProps.updateCustomerPhase === "success"){
      this.componentDidMount();
      } else{
        // message.error('Invalid email id')
      }
      this.props.adminClearPhase()
}
changeData(_id){
  console.log(_id)
}
refreshPage() {
    window.location.reload(false);
}
  searchUsersData(e) {
    this.setState({ text: e.target.value })
    const payload = {
      text: e.target.value,
      page: 1
    }
    this.props.getCustomerData(payload)
  }

   updateStatus(status,id) {
    console.log('ss',id._id);
    console.log(status)
      var userId=id._id;
    const data = {
      userId: userId,
    }
    this.props.updateCustomerStatus(data)
  }
  render() {
    const { UsersData, totalLength } = this.state
    let totalUser = totalLength

    if ((this.state.text).length !== 0) {
      totalUser = UsersData.length
    }
    const columns = [
  {
    title: 'Image',
    dataIndex: 'userImage',
    key: 'userImage',
    render:userImage=> <Avatar src={userImage}/>
   // render:userImage=> <Avatar src='/images/profile.png' />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Contact Number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Block/Unblock',
    dataIndex: 'status',
    key: 'status',
    render:(status,_id)=><Switch checked={status} onClick={()=>this.updateStatus(status,_id)}/>
  },
  {
    title:'ViewMore',
    dataIndex:'_id',
    key:'_id',
    render:(_id,data)=><Link to={`/admin/customer-details/${_id}`} className="btn_more">View More</Link>

  }
]
    return (
      <div>
        <Spin spinning={this.state.loading}>
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
                    dataSource={UsersData}
                    pagination={true}
                  />
                </div>
                {/* <div className="users_list">
                  <List
                    itemLayout="horizontal"
                    dataSource={UsersData}
                    renderItem={item => (
                      <List.Item
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={_.get(item, 'userImage', '/images/profile.png')} />}
                          title={_.get(item, 'name', '')}
                          description={<div className="user_info_wrap">
                            <ul>
                              <li>
                                <p><span>Email - </span>{_.get(item, 'email', '')}</p>
                              </li>
                              <li>
                                <p><span>Phone Number -</span>{_.get(item, 'phone', '')}</p>
                              </li>
                              <li>
                                <p><span>Gender -</span>{_.get(item, 'gender', '')}</p>
                              </li>
                              <li>
                                <p><span>Age -</span>{_.get(item, 'age', '')}</p>
                              </li>
                            </ul>
                          </div>}
                        />
                      </List.Item>
                    )}
                  />
                </div> */}
                {/* <div className="pagination_wrapper">
                  <Pagination
                    onChange={this.changePage.bind(this)}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={totalUser}
                    hideOnSinglePage={true}
                  />
                </div> */}

              </div>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}




const data = [
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
  {
    key: '1',
    name: 'Mike',
    contactNumber: '1234567890',
    email: 'mike@gmail.com',
    address: '10 Downing Street',
    gender: 'Male',
    totalPay: '$123',
    action: <Switch checked={false} />,
  },
  {
    key: '2',
    name: 'Senorita',
    contactNumber: '9876543210',
    email: 'senorita@gmail.com',
    address: '10 Downing Street London',
    gender: 'Female',
    totalPay: '$987',
    action: <Switch checked={true} />,
  },
];
