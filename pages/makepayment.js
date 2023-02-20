import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

//import 'semantic-ui-css/semantic.min.css';
import { Header, Segment, Container, Card, Icon, Menu, Input,Form,Checkbox,Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';


const optionsemester = [
  { key: 'f', text: 'First Semester', value: 'First Semester' },
  { key: 's', text: 'Second Semester', value: 'Second Semester' }
]
const optionprogramm = [
  { key: 'p', text: 'Post Graduate', value: 'Post Graduate' },
  { key: 's', text: 'Sandwich', value: 'Sandwich' },
  { key: 'f', text: 'Preliminary French', value: 'Preliminary French' },
  { key: 'sc', text: 'Preliminary Science', value: 'Preliminary Science' },
  { key: 'v', text: 'Preliminary Voctech', value: 'Preliminary Voctech' },
  { key: 'r', text: 'Remedial', value: 'Remedial' },
  { key: 'c', text: 'Cefter', value: 'Cefter' },
  { key: 'pt', text: 'Part Time', value: 'Part Time' }
]
const optiontypep = [
  { key: 'a', text: 'Academic Gown', value: 'academic gown' },
  { key: 'b', text: 'Acceptance Letter', value: 'Acceptance Letter' },
  { key: 'c', text: 'Admission Checking', value: 'Admission Checking' },
  { key: 'd', text: 'Certificate', value: 'Certificate' },
  { key: 'e', text: 'Change of Course', value: 'Change of Course' },
  { key: 'f', text: 'Damages', value: 'Damages' },
  { key: 'g', text: 'Department Fees', value: 'Department Fees' },
  { key: 'h', text: 'Id Card', value: 'Id Card' },
  { key: 'i', text: 'PG Application', value: 'PG Application' },
  { key: 'j', text: 'School Fees', value: 'School Fees' },
  { key: 'k', text: 'Department Fees', value: 'Department Fees' },
  { key: 'l', text: 'Hostel', value: 'Hostel' }
]

class MakePayment extends Component{
  state = {
      name: '',
      matno: '',
      programme: '',
      paymentType: '',
      csesion: '',
      semester: '',
      amount: '',
      errorMessage:'',
      loading: false,
      addr:'',
      Message: ''

  };

  static async getInitialProps(){
    //const token = await bsutokenfactory.methods.totalSupply().call();
    //const token = await tokenTransferFactory.methods.tokenContract().call();

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    var fulldate = date+'/'+month+'/'+year+' '+hour+':'+minute+':'+seconds;
    return  { fulldate};
  }
  onSubmit = async event =>{
    event.preventDefault();
    if (this.state.name=='' || this.state.matno=='' || this.state.paymentType=='' ||
          this.state.semester=='' || this.state.amount=='' || this.state.amount=='' ||
        this.state.programme=='' || this.state.csesion==''){
          this.setState({ loading:false, errorMessage: 'Sorry you must fill all field' });
        }else{
    this.setState({ loading:true, errorMessage: '' });
    try{

      this.setState({ Message: 'Please wait while your transaction is processing.....'});
     const accounts = await web3.eth.getAccounts();
    //  var tokenprice = 100000;
    //  var amt = this.state.amount * tokenprice;
      //this.setState({ loading:true, errorMessage: this.state.programme + this.state.semester + this.state.paymentType+this.state.addr});
      //await bsutokenfactory.methods.transfer('0x51BCd6d570bD7001D99a5debE5fa6B11d9ffFD33', amt).send({
      //  from:this.state.addr
    // });
     await tokenTransferFactory.methods.payFees(this.state.name,this.state.matno,this.state.paymentType,
          this.state.semester,this.state.amount,this.state.csesion,this.state.programme).send({
            from: accounts[0]
          });
          this.setState({programme:'',semester:'',paymentType:'',addr:'',amount:'',name:'',csesion:'',matno:''});
          const paidStudentsCount = await tokenTransferFactory.methods.getAllPaidStudentsCount().call();
          const lastpaid = Number(paidStudentsCount) - 1;
           Router.pushRoute(`/receipt/${lastpaid}`);

  }catch(err){
    this.setState({ errorMessage: err.message});
    this.setState({ Message: ''});

  }
  this.setState({ loading:false });
  this.setState({ Message: 'SuccessFull!!!'});

  }
}
  handleSelectChangeP=(e,{value})=>this.setState({programme:value});
  handleSelectChangeS=(e,{value})=>this.setState({semester:value});
  handleSelectChangePt=(e,{value})=>this.setState({paymentType:value});

  render(){
    const { value } = this.state;
  return(
    <div>
    <Layout >
<Container>
<h3 style={{marginLeft:80,marginTop:20,fontSize:30,color:'red'}} >Please you enter a valid token account before making Payment</h3>
<hr/>
<Segment style={{background:'#e6f2ff',marginTop:30}}>

    <Form error={!!this.state.errorMessage} class="ui huge form" style={{marginLeft:50,marginRight:50}} onSubmit={this.onSubmit}>
    <Message error header="oops!" content={this.state.errorMessage} />
    <div class="equal width fields">
      <div class="field">
        <label>Amount</label><input type='number' require placeholder="Amount"
           value={this.state.amount}
           onChange={event => this.setState({amount: event.target.value})}
         />
      </div>
      <div class="field">
        <label>Enter Account Address</label><input require placeholder="wallet address"
           value={this.state.addr}
           onChange={event => this.setState({addr: event.target.value})}
         />
      </div>
    </div>
    <div class="equal width fields">
      <div class="field">
        <label>Full Name</label><input placeholder="Full name" require
        value={this.state.name}
        onChange={event => this.setState({name: event.target.value})}
         />
      </div>
      <div class="field">
        <label>Matric Number</label><input placeholder="Matric no" require
        value={this.state.matno}
        onChange={event => this.setState({matno: event.target.value})}
         />
      </div>
    </div>
    <div class="equal width fields">
      <div class="field">
      <Form.Select fluid label='Programme' options={optionprogramm} placeholder='Programme'
      value={value}
       onChange={this.handleSelectChangeP}
        />
      </div>
      <div class="field">
      <Form.Select fluid label='Payment Type' options={optiontypep} placeholder='Payment Type'
      value={value}
       onChange={this.handleSelectChangePt}
       />
      </div>
    </div>
    <div class="equal width fields">
      <div class="field">
        <label>Session</label><input placeholder="Session" require
        value={this.state.csesion}
        onChange={event => this.setState({csesion: event.target.value})}
        />
      </div>
      <div class="field">
        <Form.Select fluid label='Semester' options={optionsemester} placeholder='Semester' require
        value={value}
         onChange={this.handleSelectChangeS}
        />
      </div>
    </div>
    <div style={{marginLeft:300,color:'navy'}}>{this.state.Message}</div>
     <Button size='huge' style={{marginLeft:400}} content="Make Payment" icon="add circle" color='blue' loading={this.state.loading} />

    <div class="ui hidden divider"></div>
  </Form>
  </Segment>
</Container>
</Layout>
    </div>
  );
};
}
export default MakePayment;
//payFees(string _name,string _matno,string _paymentType,string _date,string _semester,uint _amount,string _session,string _programme,address _recipient)
