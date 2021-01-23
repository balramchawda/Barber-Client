import React, { PureComponent } from 'react'
import _ from 'lodash'
import HeaderComponent from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
import { List, Avatar,Collapse, Pagination, Spin, Switch, Table, Tag, Space } from 'antd'

// import EmptyData from '../../Emptypage'
import { Link, withRouter } from "react-router-dom"
import './styles.scss';
const API_URL = process.env.REACT_APP_API_HOSTNAME;

export default class ViewBarberProfile extends PureComponent {
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
      userId: '',
      BarberProfileData:{},
      servicesProvided:[]
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ loading: false ,userId: this.props.match.params.userId})  
    this.props.getBarberProfile({ userId: this.props.match.params.userId})
  }

  componentWillReceiveProps(recieveProps) {
    const {barberDetailData,paymentData}=recieveProps;
    console.log(recieveProps)
    if(recieveProps.barberDetailPhase=="success"){
      this.setState({
        BarberProfileData:barberDetailData,
        PaymentData:paymentData,
        servicesProvided:_.get(barberDetailData,'serviceTypeList',[])
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    console.log(prevProps.updateCustomerPhase);
  }
  render() {
    const { Panel } = Collapse;
    const {BarberProfileData,servicesProvided,PaymentData}=this.state;

    function callback(key) {
      console.log(key);
    }
    const columnService = [
      
      {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
      },
      
    ]
    const columns = [
       {
    title: 'Customer Image',
    dataIndex: 'userImage',
    key: 'userImage',
    render:(userImage,data)=> <Avatar src={_.get(data,'customerDetails.userImage','')}/>
    },
      {
        title: 'Customer Name',
        dataIndex: 'name',
        key: 'name',
        render: (text,data) => <a>{_.get(data,'customerDetails.name','')}</a>,
      },
      {
        title: 'Service Name',
        dataIndex: 'serviceName[0]',
        key: 'serviceName[0]',
        render: (text,data) =><a> {_.get(data,'serviceName[0]','')}</a>,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Credited',
        dataIndex: 'amountPayable',
        key: 'amountPayable',
        render: (text,data) => <p>${_.get(data,'amountPayable','')}</p>,
      },
      {
        title: 'Payment Mode',
        dataIndex: 'paymentMode',
        key: 'paymentMode',
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
                <h1 className="page_title">Barber's Detail</h1>
                <img alt="img" className="profile_img" src={_.get(BarberProfileData,'userImage',"/images/User_male.png")} />
                <div className="content_wrapper">
                  <p><span>Business/Barber Name: </span>{_.get(BarberProfileData,'name','')}</p>
                  <p><span>Email: </span>{_.get(BarberProfileData,'email','')}</p>
                  <p><span>Address: </span>{_.get(BarberProfileData,'address.streetAddress','')} {_.get(BarberProfileData,'address.city','')}</p>
                  <p><span>UserType: </span>{_.get(BarberProfileData,'userType','')}</p>
                  <p><span>TotalEarnedAmount: </span>${_.get(BarberProfileData,'totalEarnedAmount','')}</p>
                </div>
              </div>
              <div className="bottom_wrapper">
                <Collapse onChange={callback}>
                  <Panel header="Services Provide" key="1">
                    <div>
                      <Table
                        columns={columnService}
                        dataSource={servicesProvided}
                        pagination={true}
                      />
                    </div>
                  </Panel>
                </Collapse>
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

const dataService = [
  {
    key: '1',
    serialNumber: '1',
    serviceName: 'Service Name',
    date: '2nd July 2020',
  },
];

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
  },
];
