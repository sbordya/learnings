// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const OnlyOwner = artifacts.require("OnlyOwner");

contract("OnlyOwner", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];

  before(async () => {
    instance = await OnlyOwner.deployed({ from: owner });
  });

  it("owner can call add()", async () => {
    await instance.add(10, { from: owner });
    const result = await instance.get({ from: owner });
    assert.equal(10, result, "get() should return 10");
  });

  it("owner can call subtract()", async () => {
    await instance.subtract(1);
    const result = await instance.get({ from: owner });
    assert.equal(9, result, "get() should return 9");
  });

  it("non-owner cannot call add()", async () => {
    try {
      await instance.add(1, { from: acc1 });
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "add() should fail when called by non owner");
  });

  it("non-owner cannot call subtract()", async () => {
    try {
      await instance.subtract(1, { from: acc1 });
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "subtract() should fail when called by non owner");
  });

  it("non-owner cannot call get()", async () => {
    try {
      await instance.get({ from: acc1 });
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "get() should fail when called by non owner");
  });
});
