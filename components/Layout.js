import React from 'react';
import ReactDOM from 'react-dom';
import { Segment, Container, Card, Icon, Menu, Input } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react';
import Head from '../components/Head'


export default props =>  {
  return(
    <div style={{background:'#f2f2f2'}}>

    <Head />
      {props.children}
<Segment style={{background:'grey',color:'black',marginBottom:1}} ><h3><b>Copyright @ Benue State University, Makurdi  2019</b></h3></Segment>

    </div>
  );
};
