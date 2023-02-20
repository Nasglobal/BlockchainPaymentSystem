import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'semantic-ui-react'
import { Link } from '../routes';
import web3 from '../ethereum/web3';

class PaidStudentsRow extends Component{

  render(){
    const { Row, Cell} = Table;
    const { id, paidStudents } = this.props;
    return (
      <Row>
      <Cell>
      {id}
      </Cell>
      <Cell>
      {paidStudents.name}
      </Cell>
      <Cell>
      {paidStudents.matno}
      </Cell>
      <Cell>
      {paidStudents.paymentType}
      </Cell>
      <Cell>
      {paidStudents.semester}
      </Cell>
      <Cell>
      {web3.utils.hexToNumber(paidStudents.amount)}
      </Cell>
      <Cell>
      {paidStudents.session}
      </Cell>
      <Cell>
      {paidStudents.programme}
      </Cell>
      <Cell>
        <Button>
        <Link route={`/receipt/${id}`}>
      <a>
       PrintReceipt
      </a>
      </Link>
      </Button>

      </Cell>

      </Row>
    )
  }
}
export default PaidStudentsRow;
