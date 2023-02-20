 const path = require('path');
 const solc = require('solc');
 //const fs1 = require('fs');
 const fs = require('fs-extra');

 const buildPath = path.resolve(__dirname,'build');
 fs.removeSync(buildPath);

 const BsuTokenPath = path.resolve(__dirname,'contracts','BsuToken.sol');
 const source = fs.readFileSync(BsuTokenPath,'utf8');
 //compiles the contract
 const output = solc.compile(source, 1).contracts;
//console.log(output);
 //ensure a directory exist else creates interval
 fs.ensureDirSync(buildPath);

 for (let contract in output){
   fs.outputJsonSync(path.resolve(buildPath, contract.replace(':','') + '.json'), output[contract]);
 }
