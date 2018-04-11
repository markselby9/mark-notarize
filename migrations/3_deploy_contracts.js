var Notarize = artifacts.require("Notarize");

module.exports = function(deployer) {
  deployer.deploy(Notarize, 0, 0, '1', 30);
};