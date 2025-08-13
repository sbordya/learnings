// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Richest = artifacts.require("Richest");

contract("Richest", (accounts) => {
  let instance;
  const acc0 = accounts[1];
  const acc1 = accounts[2];

  before(async () => {
    instance = await Richest.deployed();
  });

  it("should have default richest address as 0 address", async () => {
    assert.equal(0, await instance.getRichest());
  });

  it("account0 can become the richest", async () => {
    await instance.becomeRichest({ from: acc0, value: 1e18 });
    const richestAddress = await instance.getRichest();
    assert.equal(acc0, richestAddress);
  });

  it("richest address cannot withdraw", async () => {
    const balance = await web3.eth.getBalance(instance.address);
    await instance.withdraw({ from: acc0 });
    const newBalance = await web3.eth.getBalance(instance.address);
    assert.equal(newBalance, balance);
  });

  it("account1 can become richest", async () => {
    await instance.becomeRichest({ from: acc1, value: 2e18 });
    const richestAddress = await instance.getRichest();
    assert.equal(acc1, richestAddress);
  });

  it("account1 cannot withdraw", async () => {
    const balance = await web3.eth.getBalance(instance.address);
    await instance.withdraw({ from: acc1 });
    const newBalance = await web3.eth.getBalance(instance.address);
    assert.equal(newBalance, balance);
  });

  it("account0 can withdraw old richest funds", async () => {
    const balance = await web3.eth.getBalance(instance.address);
    await instance.withdraw({ from: acc0 });
    const newBalance = await web3.eth.getBalance(instance.address);
    assert.equal(newBalance, balance - 1e18);
  });
});
