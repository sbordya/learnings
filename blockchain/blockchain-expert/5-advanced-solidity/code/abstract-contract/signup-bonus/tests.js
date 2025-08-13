// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Bank = artifacts.require("Bank");

contract("Bank", (accounts) => {
  let instance;
  const acc0 = accounts[0];
  const acc1 = accounts[1];

  before(async () => {
    instance = await Bank.deployed();
  });

  it("acc0 can deposit without bonus", async () => {
    await instance.deposit({ from: acc0, value: 100 });
    const balance = await instance.getBalance({ from: acc0 });
    assert.equal(100, balance, "acc0 balance should be 100");
  });

  it("acc0 can deposit second time and not get bonus", async () => {
    await instance.deposit({ from: acc0, value: 1100 });
    const balance = await instance.getBalance({ from: acc0 });
    assert.equal(1200, balance, "acc0 balance should be 1200");
  });

  it("acc0 cannot withdraw invalid amount", async () => {
    try {
      await instance.withdraw(1300, { from: acc0 });
      assert.ok(false, "withdraw should fail");
    } catch {
      return;
    }
  });

  it("acc0 can withdraw partial amount", async () => {
    await instance.withdraw(1100, { from: acc0 });
    const balance = await instance.getBalance({ from: acc0 });
    assert.equal(100, balance, "acc0 balance should be 100");
    assert.equal(
      100,
      await web3.eth.getBalance(instance.address),
      "contract balance should be 100"
    );
  });

  it("acc0 can withdraw full amount", async () => {
    await instance.withdraw(100, { from: acc0 });
    const balance = await instance.getBalance({ from: acc0 });
    assert.equal(0, balance, "acc0 balance should be 0");
    assert.equal(
      0,
      await web3.eth.getBalance(instance.address),
      "contract balance should be 0"
    );
  });

  it("acc0 does not receive bonus on new deposit", async () => {
    await instance.deposit({ from: acc0, value: 1100 });
    const balance = await instance.getBalance({ from: acc0 });
    assert.equal(1100, balance, "acc0 balance should be 1100");
  });

  it("acc1 can deposit with bonus", async () => {
    await instance.deposit({ from: acc1, value: 1100 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(1250, balance, "acc1 balance should be 1250");
  });

  it("acc1 can withdraw bonus", async () => {
    await instance.withdraw(1250, { from: acc1 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(0, balance, "acc1 balance should be 0");
    assert.equal(
      950,
      await web3.eth.getBalance(instance.address),
      "contract balance should be 950"
    );
  });
});
