const assert = require('assert');
const ganache = require('ganache-cli');
const options = { gasLimit: 8000000 };
const provider = ganache.provider(options);
const Web3 = require('web3');
const web3 = new Web3(provider);
const bsuToken = require('../ethereum/build/BsuToken.json');
//const tokenTransfer = require('../ethereum/build/TokenTransfer.json');

let accounts;
let bsuTokendeploy;
let tokenTransferdeploy;

const deploy =  async () => {
  accounts = await web3.eth.getAccounts();
  bsuTokendeploy = await new web3.eth.Contract(JSON.parse(bsuToken.interface))
  .deploy({data: '0x' + bsuToken.bytecode, arguments:[10000000]})
  .send({ gas: '5000000', from: accounts[0] });
  console.log('address of the deployed contract is : ' + bsuTokendeploy.options.address);
  // await bsuTokenAddress.methods.name();
//  tokenTransferdeploy = await web3.eth.Contract(JSON.parse(tokenTransfer.interface))
//  .deploy({data: tokenTransfer.bytecode})
//  .send({from : accounts[0], gas: '100000'});
}
deploy();
describe('BsuToken',()=>{
  it('deploys bsutoken and transfer',()=>{
    assert.ok(bsuTokendeploy.options.address);
  //  assert.ok(tokenTransferdeploy.options.address);
  });
});
