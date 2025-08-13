// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const EventEmitter = artifacts.require("EventEmitter");

contract("EventEmitter", (accounts) => {
  let instance;
  const owner = accounts[0];

  before(async () => {
    instance = await EventEmitter.deployed({ from: owner });
  });

  it("emits correct event with count = 1", async () => {
    const result = await instance.count();
    const event = result.logs[0];
    assert.equal("Called", event.event, "Called event should be fired");
    assert.equal(1, event.args.count, "count should be 1");
    assert.isNotNull(event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 2", async () => {
    const result = await instance.count();
    const event = result.logs[0];
    assert.equal("Called", event.event, "Called event should be fired");
    assert.equal(2, event.args.count, "count should be 2");
    assert.isNotNull(event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 3", async () => {
    const result = await instance.count();
    const event = result.logs[0];
    assert.equal("Called", event.event, "Called event should be fired");
    assert.equal(3, event.args.count, "count should be 3");
    assert.isNotNull(event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 4", async () => {
    const result = await instance.count();
    const event = result.logs[0];
    assert.equal("Called", event.event, "Called event should be fired");
    assert.equal(4, event.args.count, "count should be 4");
    assert.isNotNull(event.args.sender, "sender should not be null");
  });
});
