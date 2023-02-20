const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const bsuToken = require('./build/BsuToken.json');
const tokenTransfer = require('./build/TokenTransfer.json');
const provider = new HDWalletProvider('valid trim excite naive burger praise else bicycle hope bamboo brief garden','https://rinkeby.infura.io/v3/d2a6205235e44e2ba2dfd6583b89b869');

const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  try{
 console.log('Attempting to deploy from account: ', accounts[0]);
 bsuTokendeploy = await new web3.eth.Contract(JSON.parse(bsuToken.interface))
 .deploy({data: '0x' + bsuToken.bytecode, arguments:[100000000000]})
 .send({ gas: '1000000', from: accounts[0] });
 console.log('address of the deployed BsuToken contract is : '+bsuTokendeploy.options.address);
console.log('0x' + tokenTransfer.bytecode);
 tokenTransferdeploy = await new web3.eth.Contract(JSON.parse(tokenTransfer.interface))
 .deploy({data: '0x' + tokenTransfer.bytecode, arguments:['0xF8e3f66F541726e519Db7Aa1cE49036fC63D333A', 1000000000000000, '0x9F0B5ACF071Acf445Bc113f37BcA971069D57b55']})
 .send({ gas: '2000000', from: accounts[0] });
 console.log('address of the deployed TokenTransfer contract is : ' + tokenTransferdeploy.options.address);
}catch(err){
  console.log(err);
}
};
deploy();
