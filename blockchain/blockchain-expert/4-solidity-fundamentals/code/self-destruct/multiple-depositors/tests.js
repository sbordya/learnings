// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Competitors = artifacts.require("Competitors");

contract("Competitors", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];
  const oneEther = web3.utils.toWei("1", "ether");

  before(async () => {
    instance = await Competitors.deployed({ from: owner });
  });

  it("acc1 can deposit", async () => {
    try {
      await instance.deposit({
        from: acc1,
        value: oneEther,
      });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        oneEther,
        newBalance,
        "smart contract balance should be 1 ether"
      );
    } catch (error) {
      assert.ok(false, "deposit() should be successful");
    }
  });

  it("acc2 can deposit", async () => {
    try {
      await instance.deposit({
        from: acc2,
        value: oneEther,
      });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        oneEther * 2,
        newBalance,
        "smart contract balance should be 2 ether"
      );
    } catch (error) {
      assert.ok(false, "deposit() should be successful");
    }
  });

  it("acc3 cannot deposit", async () => {
    try {
      await instance.deposit({
        from: acc3,
        value: oneEther,
      });
      assert.ok(false, "deposit() should not be successful for 3rd account");
    } catch (error) {
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        oneEther * 2,
        newBalance,
        "smart contract balance should be 2 ether"
      );
      return;
    }
  });

  it("acc2 cannot deposit less than 1 ether", async () => {
    try {
      await instance.deposit({
        from: acc2,
        value: 100,
      });
      assert.ok(
        false,
        "deposit() should not be successful when not sending 1 ether"
      );
    } catch (error) {
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        oneEther * 2,
        newBalance,
        "smart contract balance should be 2 ether"
      );
      return;
    }
  });

  it("owner cannot destory contract", async () => {
    try {
      await instance.destroy({ from: owner });
      assert.ok(
        false,
        "destroy should be unsuccessful when withdraw has not occurred"
      );
    } catch (error) {
      return;
    }
  });

  it("acc1 can deposit again", async () => {
    try {
      await instance.deposit({
        from: acc1,
        value: oneEther,
      });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        oneEther * 3,
        newBalance,
        "smart contract balance should be 3 ether"
      );
    } catch (error) {
      assert.ok(false, "deposit() should be successful");
    }
  });

  it("acc2 cannot deposit again", async () => {
    try {
      await instance.deposit({
        from: acc2,
        value: web3.utils.toWei(1, "ether"),
      });
      assert.ok(false, "deposit() should fail when max eth has been received");
    } catch (error) {
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        3 * oneEther,
        newBalance,
        "smart contract balance should be 3 ether"
      );
    }
  });

  it("acc2 cannot withdraw", async () => {
    try {
      await instance.withdraw({
        from: acc2,
      });
      assert.ok(
        false,
        "withdraw() should fail when called by account that is not max depositor"
      );
    } catch (error) {
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        3 * oneEther,
        newBalance,
        "smart contract balance should be 3 ether"
      );
    }
  });

  it("acc1 can withdraw", async () => {
    try {
      await instance.withdraw({
        from: acc1,
      });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(0, newBalance, "smart contract balance should be 0 ether");
    } catch (error) {
      assert.ok(
        false,
        "withdraw() should be successful when called by max depositor"
      );
    }
  });

  it("non-owner cannot destory contract", async () => {
    try {
      await instance.destroy({ from: acc1 });
      assert.ok(
        false,
        "destroy should be unsuccessful when called by non-owner"
      );
    } catch (error) {
      return;
    }
  });

  it("owner can destroy contract", async () => {
    try {
      await instance.destroy({ from: owner });
    } catch (error) {
      assert.ok(
        false,
        "destroy should be successful when withdraw have occurred and winner is chosen"
      );
    }
  });
});
