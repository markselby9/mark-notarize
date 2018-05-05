var Notarize = artifacts.require("Notarize");
var NotarizeFactory = artifacts.require("NotarizeFactory");

module.exports = function(deployer) {
  deployer.deploy(Notarize, 0, 0, '1', 30);
  deployer.deploy(NotarizeFactory);
};