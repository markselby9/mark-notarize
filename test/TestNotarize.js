var Notarize = artifacts.require("Notarize");
var NotarizeFactory = artifacts.require("NotarizeFactory");

contract('Notarize', async (accounts) => {
  let instance;
  let addrA;
  let addrB;

  beforeEach('setup contract for each test', async function () {
    addrA = accounts[0];
    addrB = accounts[1];
    instance = await Notarize.new(addrA, addrB, 'contract', 30);
  });

  it('should be able to create a new instance', async () => {
    let userA = await instance.userA.call();
    let userB = await instance.userB.call();
    assert.equal(userA[0], addrA);
    assert.isFalse(userA[1]);
    assert.equal(userB[0], addrB);
    assert.isFalse(userB[1]);
  });

  it('needs both user to sign the contract', async () => {
    await instance.sign({ from: accounts[0] });
    assert.isFalse(await instance.isFinished());
    await instance.sign({ from: accounts[1] });
    assert.isTrue(await instance.isFinished());
  });
});

contract('NotarizeFactory', async (accounts) => {
  let factory;
  let addrA;
  let addrB;

  beforeEach('setup contract for each test', async function () {
    addrA = accounts[0];
    addrB = accounts[1];
    factory = await NotarizeFactory.new();
  });

  it('should be able to add new notarize by factory', async () => {
    await factory.addNotarize(accounts[2], accounts[3], 'message', 30);
    let deployedNotarizes = await factory.getDeployedNotarizes.call();
    assert.equal(deployedNotarizes.length, 1);
  })
});
