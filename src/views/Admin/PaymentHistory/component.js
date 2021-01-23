import React, { PureComponent } from 'react'
// import { Modal } from 'antd';
import _ from 'lodash'
import { Link, withRouter } from "react-router-dom"
import './styles.scss';
import { List,Modal,Select, Avatar, Pagination, Spin, Switch, Table, Tag, Space } from 'antd'

export default class Barber extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      PaymentData:[]
    }
  }
  searchUsersData(e) {
    this.setState({ text: e.target.value })
    const payload = {
      text: e.target.value
    }
    this.props.getPaymentHistory(payload)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentDidMount(){
    var data={
      page:0,
      text:''
    }
    this.props.getPaymentHistory(data)
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
    componentWillReceiveProps(receiveProps){
    console.log(receiveProps); 
    if(receiveProps.paymentHistoryPhase=="success"){
    this.setState({
    PaymentData:receiveProps.paymentData
    });
      // this.props.adminClearPhase();
  }
}
  searchUsersData(e) {
    this.setState({ text: e.target.value })
    const payload = {
      text: e.target.value,
      page: 1
    }
    this.props.getPaymentHistory(payload)
  }
  render() {
   const columns = [
   {
    title: 'Booking ID',
    dataIndex: 'bookingId',
    key: 'bookingId',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerDetails',
    key: 'customerName',
    render:customerDetails=><p>{_.get(customerDetails,'name','')}</p>   
  },
  {
    title: 'Barber Name',
    dataIndex: 'barberDetails',
    key: 'barberDetails',
    render:barberDetails=><p>{_.get(barberDetails,'name','')}</p>
  }, 
  {
    title: 'Total Amount',
    dataIndex: 'amountPayable',
    key: 'amountPayable',
  },
  {
    title: 'Payment Mode',
    dataIndex: 'paymentMode',
    key: 'paymentMode',
  },    
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
  }
]
const {PaymentData}=this.state;
    return (
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
                    dataSource={PaymentData}
                    pagination={true}
                  />
                  </div>
                </div>
              </div>
            </div>
    )
  }
}


   {/* <div>
               <div className="container">
                 <div className="row">
                   <div className="col-md-12">
                     <h1>Payment History</h1>
                     <div>
             <button type="primary" onClick={this.showModal}>
               Open Modal
             </button>
             <Modal
               title="Basic Modal"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               footer={[
                 <button key="back" onClick={this.handleCancel}>
                   Return
                 </button>,
                 <button key="submit" type="primary" onClick={this.handleOk}>
                   Submit
                 </button>,
               ]}
             >
               <p>Some contents...</p>
               <p>Some contents...</p>
               <p>Some contents...</p>
             </Modal>
           </div>
                   </div>
                 </div>
               </div>
           </div> 
         */}
      