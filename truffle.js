var HDWalletProvider = require("truffle-hdwallet-provider");
var secret = require('./secret');
var mnemonic = secret.mnemonic;
var access_token = secret.INFURA_Access_Token;

const Web3 = require('web3');
const provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+access_token);
const web3 = new Web3(provider);


module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+access_token)
      },
      network_id: 3,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/"+access_token)
      },
      network_id: 4, // Rinkeby ID 4
      gas: 6712388, gasPrice: 1000000000,
    }
  }
};
