import React, { PureComponent } from 'react'
import { List, Avatar, Pagination, Spin,Rate, Switch, Table, Tag, Space } from 'antd'
import _ from 'lodash'
// import EmptyData from '../../Emptypage'
import { push } from 'react-router-redux';
import { Link, withRouter } from "react-router-dom"
import './styles.scss';
// const API_URL = process.env.REACT_APP_API_HOSTNAME;

export default class Barber extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      UsersData: '',
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      totalLength: '',
      loading: false
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.refreshPage = this.refreshPage.bind(this)

  }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.props.getBarberData({ page: this.state.page, text: this.state.text })
    
    // this.props.updateBarberStatus({userId:"s23423fdslk32nklkns32"});
  }

  changePage(pageNumber) {
    this.setState({ page: parseInt(pageNumber) })
    const payload = {
      page: pageNumber,
      text: this.state.text
    }
    this.props.getBarberData(payload)
  }
  
componentWillReceiveProps(recieveProps) {

    const { barberPhase,barberData,isSuccess } = recieveProps
      const {loading,UsersData}=this.state;
      this.setState({
      loading:false,
      UsersData:barberData
     })
}

componentDidUpdate(prevProps, prevState){
if(prevProps.updateBarberPhase === "success"){
      this.componentDidMount();

      } else{
        // message.error('Invalid email id')
      }
      this.props.adminClearPhase();
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
    this.props.getBarberData(payload)
  }

  updateStatus(status,id) {
    var userId=id._id;
    const data = {
      userId: userId,
    }
    this.props.updateBarberStatus(data)
  }

  render() {
    const { UsersData, totalLength ,updateStatus} = this.state
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
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'User Type',
    dataIndex: 'userType',
    key: 'userType',
  },
  
  {
    title:"Rating",
    dataIndex:'ratingAvg',
    key:"ratingAvg",
    render:ratingAvg=><Rate value={ratingAvg} />
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
    render:(_id,data)=><Link to={`/admin/barber-details/${_id}`} className="btn_more">View More</Link>
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




