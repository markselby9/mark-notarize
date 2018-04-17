const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledNotarize = require('../build/Notarize.sol:Notarize.json');
const compiledNotarizeFactory = require('../build/NotarizeFactory.sol:NotarizeFactory.json');
var secret = require('../secret');
var mnemonic = secret.mnemonic;
var access_token = secret.INFURA_Access_Token;

const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/' + access_token,
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result1 = await new web3.eth.Contract(JSON.parse(compiledNotarize.interface))
    .deploy({ data: compiledNotarizeFactory.bytecode, arguments: [0,0,0,0] })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result1.options.address);

  const result2 = await new web3.eth.Contract(JSON.parse(compiledNotarizeFactory.interface))
    .deploy({ data: compiledNotarizeFactory.bytecode, arguments: [] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result2.options.address);
};
deploy();