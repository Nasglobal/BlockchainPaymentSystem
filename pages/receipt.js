import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

//import 'semantic-ui-css/semantic.min.css';
import { Header, Segment, Container, Card, Icon, Menu, Input,Form,Table,Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import PaidStudentsRow from '../components/PaidStudentsRow'


class ViewPayment extends Component{

  static async getInitialProps(props){
    const indexofpayment = props.query.lastpaid;
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    var fulldate = date+'/'+month+'/'+year;


    const paidStudentsCount = await tokenTransferFactory.methods.getAllPaidStudentsCount().call();
    const paidStudents = await Promise.all(
      Array(Number(paidStudentsCount)).fill().map((element, index)=>{
        return tokenTransferFactory.methods.paidStudents(index).call();
      })
    );

    return  { paidStudentsCount, paidStudents, fulldate, indexofpayment};
  }


  render() {
    const{ Header, Row, HeaderCell, Body} = Table;

  return(
    <div>
    <link
    rel="stylesheet"
   href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
    />
    <Container style={{margin:30}} >
      <Segment style={{marginTop:30}}>
    <Segment clearing>
    <Header as='h3' color='red' floated='left'>
      <img style={{width:100}} src="/static/bsum.jpg" class="ui fluid image" />
    </Header>
    <Header as='h3' color='red'>
      <h1 style={{marginLeft:280,marginTop:-80,color:'red'}}>Benue State University, Makurdi</h1>
      <h3 style={{marginLeft:350,marginTop:20}}> P.M.B 109, Makurdi, Nigeria.</h3>
      <h3 style={{marginLeft:380}}> Payment Receipt<span style={{marginLeft:300,fontSize:15}}>Date: {this.props.fulldate}</span></h3>
    </Header>
    </Segment>
    <div style={{paddingLeft:40,paddingRight:40}}>
    <table class="ui table">
  <tbody>
    <tr>
      <td>Name</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].name}</td>
    </tr>
    <tr>
      <td>Matric no</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].matno}</td>
    </tr>
    <tr>
      <td>Payment Type</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].paymentType}</td>
    </tr>
    <tr>
      <td>Semester</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].semester}</td>
    </tr>
    <tr>
      <td>Amount</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].amount.toString()}</td>
    </tr>
    <tr>
      <td>Session</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].session}</td>
    </tr>
    <tr>
      <td>Programme</td>
      <td>{this.props.paidStudents[Number(this.props.indexofpayment)].programme}</td>
    </tr>
  </tbody>
</table>
</div>
     </Segment>
     <div >
    <h3 style={{color:'blue'}}> Note : This document is confidential
    <span style={{marginLeft:50}}>
    <Button onClick={() => window.print()}>PrintReceipt</Button>
    </span><Button >Close</Button></h3>
     </div>
     </Container>

    </div>
  );
};
}
export default ViewPayment;
//payFees(string _name,string _matno,string _paymentType,string _date,string _semester,uint _amount,string _session,string _programme,address _recipient)
