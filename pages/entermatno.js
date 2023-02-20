import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';
import web3 from '../ethereum/web3';
import { Router, Link } from '../routes';

//import 'semantic-ui-css/semantic.min.css';
import { Header, Segment, Container, Card, Icon, Menu, Input,Form,Table,Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';

class Entermatno extends Component{

    state = {
      matnumber:''
    }

  static async getInitialProps(props){

    return  { };
  }



  onSubmit = async event =>{
    event.preventDefault();
    //const mat =  this.state.matnumber;
    Router.pushRoute(`/viewstudentpaymenthistory/${this.state.matnumber.replace(/\//g,'')}`);
    // this.setState({record:this.renderpaidStudentsRow()});

  }

  render() {

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
      <h1 style={{marginLeft:280,marginTop:0,color:'red'}}>Benue State University, Makurdi</h1>
      <Button style={{marginLeft:800}}>
      <Link route={`/`}>
    <a>
    Back
    </a>
    </Link>
    </Button>

    </Header>
    </Segment>
    <Segment style={{background:'#e6f2ff',marginTop:30}}>
    <div><center style={{color:'blue'}}><h2>Enter Your Matric Number to View Payment History</h2></center></div>
    <Form class="ui huge form" style={{marginLeft:50,marginRight:50}} onSubmit={this.onSubmit}>

    <div class="equal width fields">

      <div class="field">
      <label>Enter Matno:</label>
        <input require placeholder="Enter Matric Number"
           value={this.state.matnumber}
           onChange={event => this.setState({matnumber: event.target.value})}
         />
      </div>
    </div>
     <Button size='small' color='dark red' >View Payments</Button>
    <div class="ui hidden divider"></div>
  </Form>
     </Segment>
     </Container>
    </div>
  );
};
}
export default Entermatno;
//payFees(string _name,string _matno,string _paymentType,string _date,string _semester,uint _amount,string _session,string _programme,address _recipient)
