pragma solidity^0.4.25;

contract BsuToken{
   uint _totalSupply;
   string public name = 'Bsu Token';
   string public symbol = 'BT';
   string public standard = 'Bsu Token v1.0';
   mapping(address => uint) public balances;
   mapping(address => mapping(address => uint)) public allowance;
   event Transfer(
         address indexed _from,
         address indexed _to,
         uint _value
         );
         event Approval(
               address indexed _owner,
               address indexed _spender,
               uint _value
               );
   function totalSupply() public view returns (uint){
   return _totalSupply;
   }
   //constructor function
   constructor(uint _initialSupply) public{
   balances[msg.sender] = _initialSupply;
   _totalSupply = _initialSupply;
   }
   //transfer function
   function transfer(address _to, uint _value) public returns (bool success) {
      require(balances[msg.sender] >= _value);
      balances[msg.sender] -= _value;
      balances[_to] += _value;
      emit Transfer(msg.sender, _to , _value);
    return true;
   }
   function approve(address _spender, uint _value) public returns (bool success){
      allowance[msg.sender][_spender] = _value;
      emit Approval(msg.sender, _spender, _value);
    return true;
   }
   function transferFrom(address _from, address _to, uint _value) public returns (bool success){
       require(_value <= balances[_from]);
       require(_value <= allowance[_from][msg.sender]);
       balances[_from] -= _value;
       balances[_to] += _value;
       allowance[_from][msg.sender] -= _value;
       emit Transfer(_from, _to , _value);
   return true;
   }
}
contract TokenTransfer{

  struct Student {
      string name;
      string matno;
      string paymentType;
      string date;
      string semester;
      uint amount;
      address addOfStudent;
      string session;
      string programme;
  }

  Student[] paidStudents;
  address admin;
  uint public tokenPrice;
  uint public tokensSold;
  BsuToken public tokenContract;

event Sell(address _buyer, uint _amount);
 constructor(BsuToken _tokenContract, uint _tokenPrice) public{
 admin = msg.sender;
 tokenContract = _tokenContract;
 tokenPrice = _tokenPrice;
 //tokenContract.transfer(admin,tokenContract.totalSupply());
 }
 function multiply(uint x, uint y) internal pure returns (uint z){
    require(y == 0 || (z = x * y)/y == x);
 }
 //buy tokens
 function buyToken(uint _numberOfTokens) public payable{
 //require that value is equal to tokens
   require(msg.value == multiply(_numberOfTokens,tokenPrice));
   //require that contract have enough token
   require(tokenContract.balances(address(this)) >= _numberOfTokens);
   //require that transfer is succesful
   require(tokenContract.transfer(msg.sender, _numberOfTokens));
   //keep track of token sold
    tokensSold += _numberOfTokens;
     emit Sell(msg.sender,_numberOfTokens);
 }
 function endSale() public{
//require admin
require(msg.sender == admin);
//transfer the remaining tokens back to admin
require(tokenContract.transfer(admin, tokenContract.balances(address(this))));
//destroy contract
  selfdestruct(msg.sender);
 }
 function payFees(string _name,string _matno,string _paymentType,string _date,string _semester,
  uint _amount,string _session,string _programme,address _recipient) public payable {
    Student memory newStudent = Student({
       name: _name,
       matno: _matno,
       paymentType: _paymentType,
       date: _date,
       semester: _semester,
       amount: _amount,
       addOfStudent: msg.sender,
       session: _session,
       programme:_programme
    });
     //require(_recipient == admin);
     require(tokenContract.transfer(_recipient, _amount));

    paidStudents.push(newStudent);

 }

 function getAllPaidStudentsCount() public view returns (uint) {
  return paidStudents.length;
 }
}
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/d2a6205235e44e2ba2dfd6583b89b869');
const acc1 = '0x51BCd6d570bD7001D99a5debE5fa6B11d9ffFD33';
const acc2 = '0x9F0B5ACF071Acf445Bc113f37BcA971069D57b55';
const privatekey11 = '35ED115A6E5058CAA4323553DA25E8D6C3E4D3761903E1448BBB842658069DD6';
const privatekey22 = '6DE8EAB51F5B0317F1FB193652ADF9BF7A6FFF6332221230E7AD45A151D227B3';
const privatekey1 = Buffer.from(privatekey11,'hex');
const privatekey2 = Buffer.from(privatekey22,'hex');
web3.eth.getBalance(acc1,(err,bal)=>{
  console.log('account 1 balance: ',web3.utils.fromWei(bal, 'ether'));
});
web3.eth.getBalance(acc2,(err,bal)=>{
  console.log('account 2 balance: ',web3.utils.fromWei(bal, 'ether'));
});

web3.eth.getTransactionCount(acc1, (err, txCount)=>{

  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: acc2,
    value:web3.utils.toHex(web3.utils.toWei('100','gwei')),
    gasLimit:web3.utils.toHex(21000),
    gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei'))
  }
  try{
  const tx = new Tx(txObject);
     tx.sign(privatekey1);
     const serializedTransaction = tx.serialize();
     const raw = '0x'+serializedTransaction.toString('hex');
  web3.eth.sendSignedTransaction(raw, (err, txHash)=>{
    console.log('txHsh: ',txHash);
  });
}catch(err){
  console.log(err);
}

})
