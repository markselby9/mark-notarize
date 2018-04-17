const path = require('path');
const solidityCompiler = require('solc');
const fs = require('fs-extra');

// clear old build file
const buildPath = path.resolve(__dirname, '..', 'build');
fs.removeSync(buildPath);

const source = fs.readFileSync(path.resolve(__dirname, '..', 'contracts', 'NotarizeFactory.sol'), 'utf-8');
const input = {
  'Notarize.sol': fs.readFileSync(path.resolve(__dirname, '..', 'contracts', 'Notarize.sol'), 'utf-8'),
  'NotarizeFactory.sol': fs.readFileSync(path.resolve(__dirname, '..', 'contracts', 'NotarizeFactory.sol'), 'utf-8'),
};

const compiledContracts = solidityCompiler.compile({sources: input}, 1).contracts;

fs.ensureDirSync(buildPath);
for (let contract in compiledContracts) {
  fs.outputJsonSync(path.resolve(buildPath, contract + '.json'), compiledContracts[contract])
}