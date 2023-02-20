import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import factory from '../ethereum/factory'
//import 'semantic-ui-css/semantic.min.css';
import { Header, Segment, Container, Card, Icon, Menu, Input } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import bsutokenfactory from '../ethereum/bsutokenfactory';
import tokenTransferFactory from '../ethereum/tokenTransferFactory';

class BsuTokenIndex extends Component{
    static async getInitialProps(){
      //const token = await bsutokenfactory.methods.totalSupply().call();
      //const token = await tokenTransferFactory.address().call();
      let newDate = new Date();
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let hour = newDate.getHours();
      let minute = newDate.getMinutes();
      let seconds = newDate.getSeconds();
      var all = date+'/'+month+'/'+year+' '+hour+':'+minute+':'+seconds;
      return  { all };
    }

  render(){
  return(
    <div>
    <Layout >
    <Card.Group  style={{marginTop:8,marginLeft:8}}>
    <Card style={{width:400,height:400}}>
        <img src="/static/image1.jpg" style={{width:400,height:400}}  />
</Card>
<Card style={{marginLeft:8,width:450,height:400}} floated='right' >
<div class="ui card" style={{width:450,height:200}}>
  <div class="image"><img src="/static/imagecoin.jpg" style={{width:450,height:200}} /></div>
  <div class="content">
    <div class="header">Condusive Payment Platform for BSU students</div>
    <div class="meta">Using Digital currency</div>
    <div class="description">
    {  this.props.token }
    </div>
  </div>
  <div class="extra content">
    <a><i aria-hidden="true" class="user icon"></i>Connecting students globally</a>
  </div>
</div>
</Card  >
<Card style={{width:330,height:400}}>
       <div class="ui card" style={{width:330,height:400}}>
       <div class="content">
       <div class="header">WELCOME TO BSU DIGITAL TOKEN SYSTEM.....</div>
     <div class="description">
       This platform is provided for all students of Benue State University to make payment of any category Using
       digital currency. Every student is expected to download the Ethereum wallet to be able to store the token that is
       provided by this system.On downloading of the wallet he or she will be provided a public and
        private key pay which will be used for payment. The student will have to provide the public/private key
        pair on the provided forms before he or she can make payment and also view payment history.
     </div>
     <div class="image"><img src="/static/imagecoin1.jpg" style={{width:300,height:120}} /></div>
      </div>
     </div>
</Card>
</Card.Group>
</Layout>
    </div>
  );
}
}
export default BsuTokenIndex;
