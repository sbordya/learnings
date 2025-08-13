// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const FizzBuzz = artifacts.require("FizzBuzz");

contract("FizzBuzz", (accounts) => {
  let instance;
  const owner = accounts[0];

  before(async () => {
    instance = await FizzBuzz.deployed({ from: owner });
  });

  it("emits correct event with count = 1", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 2", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 3", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Fizz", event.event, "Fizz event should be emitted");
    assert.equal(3, event.args.count, "count should be 3");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 4", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 5", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Buzz", event.event, "Buzz event should be emitted");
    assert.equal(5, event.args.count, "count should be ");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 6", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Fizz", event.event, "Fizz event should be emitted");
    assert.equal(6, event.args.count, "count should be 6");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 7", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 8", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 9", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Fizz", event.event, "Fizz event should be emitted");
    assert.equal(9, event.args.count, "count should be 9");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 10", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Buzz", event.event, "Fizz event should be emitted");
    assert.equal(10, event.args.count, "count should be 10");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 11", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 12", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal("Fizz", event.event, "Fizz event should be emitted");
    assert.equal(12, event.args.count, "count should be 12");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });

  it("emits correct event with count = 13", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 14", async () => {
    const result = await instance.increment();
    assert.equal(0, result.logs.length, "no events should be emitted");
  });

  it("emits correct event with count = 15", async () => {
    const result = await instance.increment();
    const event = result.logs[0];
    assert.equal(
      "FizzAndBuzz",
      event.event,
      "FizzAndBuzz event should be emitted"
    );
    assert.equal(15, event.args.count, "count should be 15");
    assert.equal(owner, event.args.sender, "sender should not be null");
  });
});
