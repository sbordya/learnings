// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const RestrictedCount = artifacts.require("RestrictedCount");

contract("RestrictedCount", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];

  before(async () => {
    instance = await RestrictedCount.deployed({ from: owner });
  });

  it("acc1 cannot call getCount()", async () => {
    try {
      await instance.getCount({ from: acc1 });
      assert.ok(false, "only owner should be able to call getCount()");
    } catch {
      return;
    }
  });

  it("acc1 cannot call add()", async () => {
    try {
      await instance.add(10, { from: acc1 });
      assert.ok(false, "only owner should be able to call add()");
    } catch {
      return;
    }
  });

  it("acc1 cannot call subtract()", async () => {
    try {
      await instance.subtract(10, { from: acc1 });
      assert.ok(false, "only owner should be able to call subtract()");
    } catch {
      return;
    }
  });

  it("count starts at 0", async () => {
    const result = await instance.getCount({ from: owner });
    assert.equal(0, result, "getCount() should return 0");
  });

  it("owner can call add()", async () => {
    await instance.add(1, { from: owner });
    const result = await instance.getCount({ from: owner });
    assert.equal(1, result, "getCount() should return 1");
  });

  it("owner can call subtract()", async () => {
    await instance.subtract(10, { from: owner });
    const result = await instance.getCount({ from: owner });
    assert.equal(-9, result, "getCount() should return -9");
  });

  it("owner can call subtract() when count becomes -100", async () => {
    await instance.subtract(91, { from: owner });
    const result = await instance.getCount({ from: owner });
    assert.equal(-100, result, "getCount() should return -100");
  });

  it("owner can call add() when count becomes -100", async () => {
    await instance.add(200, { from: owner });
    const result = await instance.getCount({ from: owner });
    assert.equal(100, result, "getCount() should return 100");
  });

  it("add() fails when greater than max", async () => {
    try {
      await instance.add(1000, { from: owner });
      assert.ok(false, "add() should fail");
    } catch {
      return;
    }
  });

  it("add() fails when less than min", async () => {
    try {
      await instance.add(-1000, { from: owner });
      assert.ok(false, "add() should fail");
    } catch {
      return;
    }
  });

  it("subtract() fails when less than min", async () => {
    try {
      await instance.subtract(100, { from: owner });
      assert.ok(false, "subtract() should fail");
    } catch {
      return;
    }
  });

  it("subtract() fails when greater than max", async () => {
    try {
      await instance.subtract(-1000, { from: owner });
      assert.ok(false, "subtract() should fail");
    } catch {
      return;
    }
  });
});
