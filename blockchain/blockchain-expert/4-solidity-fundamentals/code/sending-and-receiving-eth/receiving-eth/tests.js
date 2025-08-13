// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Balances = artifacts.require("Balances");

contract("Balances", (accounts) => {
  let instance;
  const acc0 = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];

  before(async () => {
    instance = await Balances.deployed();
  });

  it("acc0 amount sent is correct after transfer", async () => {
    await web3.eth.sendTransaction({
      from: acc0,
      to: instance.address,
      value: 100,
    });

    const amountSent = await instance.getAmountSent(acc0);
    assert.equal(100, amountSent);
  });

  it("acc1 amount sent is correct after transfer", async () => {
    await web3.eth.sendTransaction({
      from: acc1,
      to: instance.address,
      value: 1000,
    });

    const amountSent = await instance.getAmountSent(acc1);
    assert.equal(1000, amountSent);
  });

  it("acc1 amount sent is correct after second transfer", async () => {
    await web3.eth.sendTransaction({
      from: acc1,
      to: instance.address,
      value: 1000,
    });

    const amountSent = await instance.getAmountSent(acc1);
    assert.equal(2000, amountSent);
  });

  it("acc2 amount sent is 0", async () => {
    const amountSent = await instance.getAmountSent(acc2);
    assert.equal(0, amountSent);
  });
});
