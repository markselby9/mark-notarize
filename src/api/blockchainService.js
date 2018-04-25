import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract';
import Notarize from '../../build/contracts/Notarize.json'
import NotarizeFactory from '../../build/contracts/NotarizeFactory.json'

let web3, accounts;
let notarizeInstance, notarizeFactoryInstance;

export const getWeb3Instance = (successFunc, errorFunc) => {
  if (web3) {
    successFunc();
  } else {
    getWeb3
      .then(results => {
        web3 = results.web3;
        if (successFunc) {
          successFunc(results);
        }
      })
      .catch(() => {
        console.log('Error finding web3.')
      });
  }
};

export const getFactoryInstance = (successFunc, errorFunc) => {
  getWeb3Instance(() => {
    if (web3) {
      const contractObject = contract(NotarizeFactory);
      contractObject.setProvider(web3.currentProvider);

      web3.eth.getAccounts((error, returnedAccounts) => {
        accounts = returnedAccounts;
        contractObject.deployed().then(instance => {
          if (successFunc) {
            successFunc(instance, accounts[0]);
          }
        })
      });
    }
    else {
      console.log('web3 not found, please check the code.');
    }
  })
};


// NotarizeFactory.sol
export const addNotarizeInFactoryInstance = ({ givenUserA, givenUserB, givenContent, givenValidDays }, successFunc, errorFunc) => {
  getFactoryInstance((instance, account) => {
    instance.addNotarize(givenUserA, givenUserB, givenContent, givenValidDays, {
      from: account,
    }).then(response => {
      console.log(response);
      successFunc(response);
    })
  })
};

export const getDeployedNotarizesInFactoryInstance = (successFunc, errorFunc) => {
  getFactoryInstance((instance, account) => {
    instance.getDeployedNotarizes.call().then(response => {
      console.log(response);
      successFunc(response);
    })
  })
};

// Notarize.sol
export const getNotarizeByAddress = (address, successFunc, errorFunc) => {
  getWeb3Instance(() => {
    if (web3) {
      const contractObject = contract(Notarize);
      contractObject.setProvider(web3.currentProvider);

      const deployedNotarizeInstance = contractObject.at(address);
      console.log(deployedNotarizeInstance);

      web3.eth.getAccounts((error, returnedAccounts) => {
        accounts = returnedAccounts;
        if (successFunc) {
          successFunc(deployedNotarizeInstance, accounts[0]);
        }
        if (error && errorFunc) {
          errorFunc(error);
        }
      });
    }
  })
};

export const isFinishedInNotarizeInstance = (address, successFunc, errorFunc) => {
  getNotarizeByAddress(address, (instance, account) => {
    console.log('isFinished', instance);
    instance.isFinished.call().then(response => {
      successFunc(response);
    });
  });
};

export const getPropertiesOfNotarizeInstance = async (address, successFunc, errorFunc) => {

  try {
    getNotarizeByAddress(address, async (instance, account) => {
        console.log('getNotarizeByAddress', instance);
        const isFinished = await instance.isFinished.call();
        const userA = await instance.userA.call();
        const userB = await instance.userB.call();
        const content = await instance.content.call();
        successFunc({
          isFinished,
          userA,
          userB,
          content,
        })
      }
    )
  } catch (e) {
    errorFunc(e);
  }
};