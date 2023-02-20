import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';
import web3 from '../ethereum/web3';
import { Router, Link } from '../routes';
import { Header, Segment, Container, Card, Icon, Menu, Input,Form,Table,Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';

class ViewSinglePayment extends Component{

    state = {
      matnumber:'',
      record:''
    }

  static async getInitialProps(props){
    const matric = props.query.matno;
    const paidStudentsCount = await tokenTransferFactory.methods.getAllPaidStudentsCount().call();
    const paidStudents = await Promise.all(
      Array(Number(paidStudentsCount)).fill().map((element, index)=>{
        return tokenTransferFactory.methods.paidStudents(index).call();
      })
    );

    return  { paidStudentsCount, paidStudents, matric}
  }


  renderpaidStudentsRow(){
    const { Row, Cell} = Table;
  return this.props.paidStudents.map((paidstudent, index)=>{
    if (paidstudent.matno.replace(/\//g,'') == this.props.matric){
      return(
        <Row>
      <Cell>
      {paidstudent.name}
      </Cell>
    <Cell>
    {paidstudent.matno}
    </Cell>
    <Cell>
    {paidstudent.paymentType}
    </Cell>
    <Cell>
    {paidstudent.semester}
    </Cell>
    <Cell>
    {web3.utils.hexToNumberString(paidstudent.amount)}
    </Cell>
    <Cell>
    {paidstudent.session}
    </Cell>
    <Cell>
    {paidstudent.programme}
    </Cell>
    <Cell>
      <Button>
      <Link route={`/receipt/${index}`}>
    <a>
     PrintReceipt
    </a>
    </Link>
    </Button>

    </Cell>

      </Row>)
    }else{
      return(
        <h2></h2>
      );
    }
             });

        }

  render() {
    const{ Header, Row, HeaderCell, Body} = Table;

  return(
    <div>
    <link
    rel="stylesheet"
   href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
    />
    <Container>
    <Segment clearing style={{marginTop:6}}>
    <Header as='h1' color='red' floated='left'>
      <img style={{width:100}} src="/static/bsum.jpg" class="ui fluid image" />
    </Header>
    <Header as='h2' color='red'>
      <h1 style={{marginLeft:280,marginTop:-80,color:'red'}}>Benue State University, Makurdi</h1>
      <Button style={{marginLeft:950}}>
      <Link route={`/`}>
    <a>
     Back
    </a>
    </Link>
    </Button>

    </Header>
    </Segment>    <Segment style={{background:'#e6f2ff',marginTop:30}}>
    <div><center style={{color:'blue'}}><h2>Your Payment history</h2></center></div>
     <Table>
     <Header>
     <Row>
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
    </div>
  );
};
}
export default ViewSinglePayment;
//payFees(string _name,string _matno,string _paymentType,string _date,string _semester,uint _amount,string _session,string _programme,address _recipient)
