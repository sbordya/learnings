// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const AdvancedCounter = artifacts.require("AdvancedCounter");

contract("AdvancedCounter", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];

  before(async () => {
    instance = await AdvancedCounter.deployed({ from: owner });
  });

  it("cannot delete counter that does not exist", async () => {
    try {
      await instance.deleteCounter("a");
      assert.ok(
        false,
        "deleteCounter() should fail when called with an id that doesn't exist"
      );
    } catch {
      return;
    }
  });

  it("cannot increment counter that does not exist", async () => {
    try {
      await instance.incrementCounter("a");
      assert.ok(
        false,
        "incrementCounter() should fail when called with an id that doesn't exist"
      );
    } catch {
      return;
    }
  });

  it("cannot decrement counter that does not exist", async () => {
    try {
      await instance.decrementCounter("a");
      assert.ok(
        false,
        "decrementCounter() should fail when called with an id that doesn't exist"
      );
    } catch {
      return;
    }
  });

  it("cannot get count that does not exist", async () => {
    try {
      await instance.getCount("a");
      assert.ok(
        false,
        "getCount() should fail when called with an id that doesn't exist"
      );
    } catch {
      return;
    }
  });

  it("acc1 can create a counter", async () => {
    await instance.createCounter("a", 10, { from: acc1 });
    const result = await instance.getCount("a", { from: acc1 });
    assert.equal(10, result, `counter with id a for account acc1 should be 10`);
  });

  it("acc2 can create a counter", async () => {
    await instance.createCounter("a", 20, { from: acc2 });
    const result = await instance.getCount("a", { from: acc2 });
    assert.equal(20, result, `counter with id a for account acc2 should be 20`);

    const result2 = await instance.getCount("a", { from: acc1 });
    assert.equal(
      10,
      result2,
      `counter with id a for account acc1 should be 10`
    );
  });

  it("acc1 can increment a counter", async () => {
    await instance.incrementCounter("a", { from: acc1 });
    const result = await instance.getCount("a", { from: acc1 });
    assert.equal(11, result, `counter with id a for account acc1 should be 11`);

    const result2 = await instance.getCount("a", { from: acc2 });
    assert.equal(
      20,
      result2,
      `counter with id a for account acc2 should be 20`
    );
  });

  it("acc1 can decrement a counter", async () => {
    await instance.decrementCounter("a", { from: acc1 });
    const result = await instance.getCount("a", { from: acc1 });
    assert.equal(10, result, `counter with id a for account acc1 should be 10`);

    const result2 = await instance.getCount("a", { from: acc2 });
    assert.equal(
      20,
      result2,
      `counter with id a for account acc2 should be 20`
    );
  });

  it("acc1 can delete a counter", async () => {
    try {
      await instance.deleteCounter("a", { from: acc1 });
    } catch {
      assert.ok(false, "deleteCounter() should delete counter");
    }

    try {
      await instance.getCount("a", { from: acc1 });
      assert.ok(
        false,
        "getCount() should fail when called with an id that doesn't exist"
      );
    } catch {}

    const result2 = await instance.getCount("a", { from: acc2 });
    assert.equal(
      20,
      result2,
      `counter with id a for account acc2 should be 20`
    );
  });

  it("acc3 can create 3 counters", async () => {
    await instance.createCounter("1", 1, { from: acc3 });
    const result = await instance.getCount("1", { from: acc3 });
    assert.equal(1, result, `counter with id 1 for account acc3 should be 1`);

    await instance.createCounter("2", -1, { from: acc3 });
    const result2 = await instance.getCount("2", { from: acc3 });
    assert.equal(
      -1,
      result2,
      `counter with id 2 for account acc3 should be -1`
    );

    await instance.createCounter("3", 100, { from: acc3 });
    const result3 = await instance.getCount("3", { from: acc3 });
    assert.equal(
      100,
      result3,
      `counter with id 3 for account acc3 should be 100`
    );
  });

  it("acc3 can manipulate counters independently ", async () => {
    await instance.incrementCounter("1", { from: acc3 });
    const result = await instance.getCount("1", { from: acc3 });
    assert.equal(2, result, `counter with id 1 for account acc3 should be 2`);

    const result2 = await instance.getCount("2", { from: acc3 });
    assert.equal(
      -1,
      result2,
      `counter with id 2 for account acc3 should be -1`
    );

    const result3 = await instance.getCount("3", { from: acc3 });
    assert.equal(
      100,
      result3,
      `counter with id 3 for account acc3 should be 100`
    );
  });

  it("acc3 cannot create a 4th counter", async () => {
    try {
      await instance.createCounter("4", 1, { from: acc3 });
      assert.ok(false, "acc3 should not be able to create a 4th counter");
    } catch {
      return;
    }
  });

  it("acc3 cannot create another counter after deleting a counter", async () => {
    try {
      await instance.deleteCounter("3", { from: acc3 });
    } catch {
      assert.ok(false, "deleteCounter() should delete counter");
    }

    await instance.createCounter("4", 50, { from: acc3 });
    const result = await instance.getCount("4", { from: acc3 });
    assert.equal(50, result, `counter with id 4 for account acc3 should be 50`);
  });
});
