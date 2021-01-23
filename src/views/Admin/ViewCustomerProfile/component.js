import React, { PureComponent } from 'react'
// import { Collapse, Table } from 'antd';
import _ from 'lodash'
import HeaderComponent from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
// import EmptyData from '../../Emptypage'
import { List, Avatar,Collapse, Pagination, Spin, Switch, Table, Tag, Space } from 'antd'

import { Link, withRouter } from "react-router-dom"
import './styles.scss';
const API_URL = process.env.REACT_APP_API_HOSTNAME;

export default class ViewCustomerProfile extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      UsersData: '',
      current: 1,
      page: 0,
      totalPage: 0,
      text: '',
      totalLength: '',
      loading: true,
      CustomerProfileData:{},
      PaymentData:[]
    }
  }

  componentDidMount() {
    this.setState({ loading: false ,userId: this.props.match.params.userId})
    this.props.getCustomerProfile({ userId: this.props.match.params.userId})
  }

  componentWillReceiveProps(recieveProps) {
const {customerDetailData,paymentData}=recieveProps;
    // console.log(recieveProps.paymentData)
    if(recieveProps.customerDetailPhase=="success"){
      this.setState({
        CustomerProfileData:customerDetailData,
        PaymentData:paymentData
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState)
    // console.log(prevProps);
    // // if(prevProps.updateCustomerPhase === "success"){
    //       this.componentDidMount();
    //       } else{
    //         // message.error('Invalid email id')
    //       }
    //       this.props.adminClearPhase()
  }
  render() {
    const { Panel } = Collapse;
    const {CustomerProfileData,PaymentData} =this.state;
    function callback(key) {
      console.log(key);
    }
    const columns = [
      {
    title: 'Barber Image',
    dataIndex: 'userImage',
    key: 'userImage',
    render:(userImage,data)=> <Avatar src={_.get(data,'barberDetails.userImage','')}/>
    },
      {
        title: 'Barber Name',
        dataIndex: 'name',
        key: 'name',
        render: (text,data) => <a>{_.get(data,'barberDetails.name','')}</a>,
      },
      {
        title: 'User Type',
        dataIndex: 'userType',
        key: 'userType',
        render: (text,data) => <a>{_.get(data,'barberDetails.userType','')}</a>,
      },
      {
        title: 'Service Name',
        dataIndex: 'serviceName[0]',
        key: 'serviceName[0]',
        render: (text,data) => <a>{_.get(data,'serviceName[0]','')}</a>,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'DoorStep',
        dataIndex: 'isDoorStep',
        key: 'isDoorStep',
      },
      {
        title: 'Debited',
        dataIndex: 'amountPayable',
        key: 'amountPayable',
        render: (text,data) => <p>${_.get(data,'amountPayable','')}</p>,

      },
      {
        title: 'Payment Mode',
        dataIndex: 'paymentMode',
        key: 'paymentMode',
        // render: (text,data) => <a>{_.get(data,'barberDetails.userType','')}</a>,
      }

    ]
    return (
    <div>
                  <HeaderComponent />
      <div className="details_page_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top_wrapper">
                <h1 className="page_title">Customer's Detail</h1>
                <img alt="img" className="profile_img" src={_.get(CustomerProfileData,'userImage','/images/User_male.png')} />
                <div className="content_wrapper">
                  <p><span>Name: </span>{_.get(CustomerProfileData,'name',"")}</p>
                  <p><span>Email: </span>{_.get(CustomerProfileData,'email',"")}</p>
                  <p><span>Phone Number: </span>{_.get(CustomerProfileData,'phone',"")}</p>
                  <p><span>Age: </span>{_.get(CustomerProfileData,'age',"")} Years</p>
                  <p><span>Gender: </span>{_.get(CustomerProfileData,'gender',"")}</p>
                  <p><span>TotalPaidAmount: </span>${_.get(CustomerProfileData,'totalPaidAmount',"")}</p>
                </div>
              </div>
              <div className="bottom_wrapper">
                <Collapse onChange={callback}>
                  <Panel header="Payment History" key="1">
                    <div>
                      <Table
                        columns={columns}
                        dataSource={PaymentData}
                        pagination={true}
                      />
                    </div>
                  </Panel>
                </Collapse>
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

const data = [
  {
    key: '1',
    serialNumber: '1',
    name: 'Mike',
    DoorService: 'Yes',
    totalAmount: '$50',
    paymentMode: 'Online',
    gender: 'Male',
    date: '2nd July 2020',
    serviceName: 'Service',
  },
];
