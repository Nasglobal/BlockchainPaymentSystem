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


  static async getInitialProps(){
    const paidStudentsCount = await tokenTransferFactory.methods.getAllPaidStudentsCount().call();
    const allPaidStudents = await Promise.all(
      Array(Number(paidStudentsCount)).fill().map((element, index) => {
        return tokenTransferFactory.methods.paidStudents(index).call()
      })
    );
    return  { paidStudentsCount, allPaidStudents};
  }

  renderpaidStudentsRow(){
    return this.props.allPaidStudents.map((paidstudent, index)=>{
      return (<PaidStudentsRow
                key = {index}
                id = {index}
                paidStudents = {paidstudent} />);
             });
        }

  render() {
    const{ Header, Row, HeaderCell, Body} = Table;

  return(
    <div>
    <Layout >
    <Container>
    <Segment style={{background:'#e6f2ff',marginTop:30}}>
    <div><center style={{color:'blue'}}><h2>List of all payment</h2></center></div>
     <Table>
     <Header>
     <Row>
     <HeaderCell>ID</HeaderCell>
     <HeaderCell>Name</HeaderCell>
     <HeaderCell>Matric no</HeaderCell>
     <HeaderCell>Payment Type</HeaderCell>
     <HeaderCell>Semester</HeaderCell>
     <HeaderCell>Amount</HeaderCell>
     <HeaderCell>Session</HeaderCell>
     <HeaderCell>Programme</HeaderCell>
     <HeaderCell>PrintReceipt</HeaderCell>
     </Row>
     </Header>
     <Body>
     {this.renderpaidStudentsRow()}
     </Body>
     </Table>
     </Segment>
     </Container>
</Layout>
    </div>
  );
};
}
export default ViewPayment;
//payFees(string _name,string _matno,string _paymentType,string _date,string _semester,uin _amount,string _session,string _programme,address _recipient)
