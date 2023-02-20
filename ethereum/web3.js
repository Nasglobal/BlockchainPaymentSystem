import Web3 from 'web3';

 //const web3 = new Web3(window.web3.currentProvider;
 let web3;
 if(typeof window !== 'undefined' && typeof window.web3 !== 'undefned'){
   //we are in the browser and metamask is running
   web3 = new Web3(window.web3.currentProvider);
 }else{
   //we are on the browser or th user is not running metamask
   const provider = new Web3.providers.HttpProvider(
     'https://ropsten.infura.io/v3/d2a6205235e44e2ba2dfd6583b89b869'
   );
    web3 = new Web3(provider);
 }
  export default web3;
//'https://rinkeby.infura.io/v3/d2a6205235e44e2ba2dfd6583b89b869'
