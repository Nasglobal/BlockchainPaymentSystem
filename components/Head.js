import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Header, Segment, Container, Card,Form, Icon,Modal,Message, Menu, Input } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react';
import { Link } from '../routes';

import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';




class Leader extends Component  {
  state = {
      amount:'',
      address:'',
      errorMessage:'',
      loading: false,
      myMessage: '',
  };

  static async getInitialProps(){

    //const token1 = await tokenTransferFactory.methods.tokenPrice().call();

  //const ss = web3.fromWei(token, 'ether').toNumber()
    return  {};
  }

  onSubmit = async event =>{
    event.preventDefault();

    this.setState({ loading:true, errorMessage: '' });
    this.setState({ myMessage: 'Please Wait your Transaction is processing........'});
    try{
    const accounts = await web3.eth.getAccounts();
    //var tokensale = await tokenTransferFactory.options.address;
   var tokenprice1 = 10000;
    var amt = this.state.amount * tokenprice1 ;
    var schoolaccount = '0x51BCd6d570bD7001D99a5debE5fa6B11d9ffFD33';
    await bsutokenfactory.methods.transfer(this.state.address, amt).send({
      from: accounts[0]
    });
    this.setState({address:'',amount:''});
      this.setState({ myMessage: 'Transaction executed SuccessFully!!'});

  }catch(err){
    this.setState({ errorMessage: err.message});
    this.setState({ myMessage: ''});
  }
  this.setState({ loading:false });

  }
render(){
  return(
    <div>
    <link
    rel="stylesheet"
   href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
    />
    <Segment style={{background:'grey'}} clearing>
    <Header as='h1' color='red' floated='left'>
      <img style={{width:100}} src="/static/bsum.jpg" class="ui fluid image" />
    </Header>
    <Header as='h1' color='red' style={{fontSize:50,fontWeight:'bold'}} floated='left'>
      Benue State University, Makurdi
      <h2 style={{color:'white'}}>Digital Token Payment System</h2>
    </Header>
    </Segment>
    <div class="ui inverted segment" style={{marginTop:-10}}>
    <Menu class="ui inverted secondary pointing menu">
    <Link route="/">
      <a class="item"> Home</a>
    </Link>

    <Modal trigger={<a class="item">Get Token</a>} closeIcon>
        <Header icon='' style={{color:'red'}} content='Welcome to Bsu Token(BTcoin) Sale Platform' />
        <Modal.Content>
        <Container>
        <h4 style={{color:'navy'}} > Ensure you enter correct Digital Token Address to be able to purchase token</h4>
        <hr/>
        <Segment style={{background:'#e6f2ff',marginTop:30}}>
            <Form error={!!this.state.errorMessage} class="ui huge form" style={{marginLeft:50,marginRight:50}} onSubmit={this.onSubmit}>
            <Message error header="oops!" content={this.state.errorMessage} />
            <div class="equal width fields">
              <div class="field">
              <label>Enter amount:</label>
                <input type='number' require placeholder="Enter Amount of Coin You Want to Buy"
                   value={this.state.amount}
                   onChange={event => this.setState({amount: event.target.value})}
                 />
              </div>
              <div class="field">
              <label>Enter your Wallet key address:</label>
                <input require placeholder="Enter correct wallet account.."
                   value={this.state.address}
                   onChange={event => this.setState({address: event.target.value})}
                 />
              </div>
            </div>
             <Button size='small' color='dark red' loading={this.state.loading} >Get Token</Button>
             <div>{this.state.myMessage}</div>
            <div class="ui hidden divider"></div>
          </Form>

          </Segment>

        </Container>
        </Modal.Content>
      </Modal>
    <Link route="/makepayment"><a class="item">Pay Fees</a></Link>
    <Link route="/entermatno"><a class="item">View Payment History</a></Link>
    <Link route="/viewpaymenthistory"><a class="item">Staff view</a></Link>

    <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
      </Menu.Menu>

      </Menu>
    </div>
    </div>
  );
};
}

export default Leader;
