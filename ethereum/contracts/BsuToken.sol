pragma solidity^0.5.1;

contract TokenTransfer is ERC20Interface,BsuToken{
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
  address public tokenContract;

event Sell(address _buyer, uint _amount);
 constructor(address _tokenContract, uint _tokenPrice) public{
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
   require(balanceOf(address(this)) >= _numberOfTokens);
   //require that transfer is succesful
   require(transfer(msg.sender, _numberOfTokens));
   //keep track of token sold
    tokensSold += _numberOfTokens;
     emit Sell(msg.sender,_numberOfTokens);
 }
 function endSale() public{
//require admin
require(msg.sender == admin);
//transfer the remaining tokens back to admin
require(transfer(admin, balanceOf(address(this))));
//destroy contract
  selfdestruct(msg.sender);
 }
 function payFees(string memory _name,string memory _matno,string memory _paymentType,string memory _date,string memory _semester,
  uint _amount,string memory _session,string memory _programme,address _recipient) public payable {
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
     require(transfer(_recipient, _amount));

    paidStudents.push(newStudent);

 }
}
pragma solidity^0.5.1;

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

 constructor(address _admin) public{
     admin = _admin;

 }


 function payFees(string memory _name,string memory _matno,string memory _paymentType,string memory _date,string memory _semester,
  uint _amount,string memory _session,string memory _programme,address _recipient) public payable {
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
     require(_recipient == admin);
     //require(transfer(_recipient, _amount));

    paidStudents.push(newStudent);

 }
}
