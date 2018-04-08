var Notarize = artifacts.require("Notarize");

contract('Notarize', async (accounts) => {
  let instance;
  let addrA;
  let addrB;

  beforeEach('setup contract for each test', async function () {
    console.log('beforeEach');
    addrA = 0x00000000000000000000000000000000000004d2;
    addrB = 0x00000000000000000000000000000000000010e1;
    instance = await Notarize.new(addrA, addrB, 'contract', 30);
  });

  it('should be able to create a new instance', async () => {
    let userA = await instance.userA.call();
    let userB = await instance.userB.call();
    assert.equal(userA[0], addrA);
    assert.isFalse(userA[1]);
    assert.equal(userB[0], addrB);
    assert.isFalse(userB[1]);
  })
});
