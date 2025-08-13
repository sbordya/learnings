// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const GreedyBanker = artifacts.require("GreedyBanker");

contract("GreedyBanker", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];

  before(async () => {
    instance = await GreedyBanker.deployed({ from: owner });
  });

  it("acc1 can deposit for free with value less than the fee", async () => {
    await instance.sendTransaction({ from: acc1, value: 500 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(500, balance, "acc1 balance should be 500");
  });

  it("acc1 can deposit with fee", async () => {
    await instance.sendTransaction({ from: acc1, value: 1100 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(600, balance, "acc1 balance should be 600");
  });

  it("acc1 cannot deposit less than fee", async () => {
    try {
      await instance.sendTransaction({ from: acc1, value: 999 });
      assert.ok(false, "depositing less than fee should fail");
    } catch {}
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(600, balance, "acc1 balance should be 600");
  });

  it("acc1 can withdraw partial balance", async () => {
    await instance.withdraw(100, { from: acc1 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(500, balance, "acc1 balance should be 600");

    assert.equal(
      1500,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1500 after withdraw"
    );
  });

  it("acc1 can withdraw full balance", async () => {
    await instance.withdraw(500, { from: acc1 });
    const balance = await instance.getBalance({ from: acc1 });
    assert.equal(0, balance, "acc1 balance should be 0");

    assert.equal(
      1000,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1000 after withdraw"
    );
  });

  it("acc1 cannot withdraw more than balance", async () => {
    try {
      await instance.withdraw(1, { from: acc1 });
      assert.ok(false, "withdraw() should fail");
    } catch {}

    assert.equal(
      1000,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1000 after withdraw"
    );
  });

  it("acc1 cannot colllect fees", async () => {
    try {
      await instance.collectFees({ from: acc1 });
      assert.ok(false, "collectFees() should fail");
    } catch {}

    assert.equal(
      1000,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1000 after withdraw"
    );
  });

  it("owner can collect fees", async () => {
    try {
      await instance.collectFees({ from: owner });
    } catch {
      assert.ok(false, "collectFees() should be successful");
    }

    assert.equal(
      0,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1000 after withdraw"
    );
  });

  it("sending funds incorrectly adds to fees", async () => {
    const data = web3.eth.abi.encodeFunctionSignature({
      name: "_maxTxAmount",
      type: "function",
      inputs: [],
    });
    await instance.sendTransaction({ from: acc2, value: 1100, data: data });
    const balance = await instance.getBalance({ from: acc2 });
    assert.equal(0, balance, "acc2 balance should be 0");

    assert.equal(
      1100,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1100 after fallback()"
    );
  });

  it("owner can collect fees", async () => {
    try {
      await instance.collectFees({ from: owner });
    } catch {
      assert.ok(false, "collectFees() should be successful");
    }

    assert.equal(
      0,
      await web3.eth.getBalance(instance.address),
      "smart contract balance should be 1000 after withdraw"
    );
  });
});
