import web3 from './web3';
import TokenTransfer from './build/TokenTransfer.json';
//import BsuToken from './build/BsuToken.json';

var abi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_matno",
				"type": "string"
			},
			{
				"name": "_paymentType",
				"type": "string"
			},
			{
				"name": "_semester",
				"type": "string"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_session",
				"type": "string"
			},
			{
				"name": "_programme",
				"type": "string"
			}
		],
		"name": "payFees",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllPaidStudentsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "paidStudents",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "matno",
				"type": "string"
			},
			{
				"name": "paymentType",
				"type": "string"
			},
			{
				"name": "semester",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "session",
				"type": "string"
			},
			{
				"name": "programme",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
const tokenTransferInstance  = new web3.eth.Contract(abi,'0x3e54bc90cdea68f2e57669f10b06444d34ee69f8');


export default tokenTransferInstance;
//'0x72cD7D8e10408AfaB2d4d2b23DDd2Ff0a676Dcd6'
