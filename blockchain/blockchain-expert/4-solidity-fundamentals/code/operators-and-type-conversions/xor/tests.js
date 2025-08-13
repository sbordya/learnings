// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const LogicGates = artifacts.require("LogicGates");

contract("LogicGates", (accounts) => {
  let instance;

  before(async () => {
    instance = await LogicGates.deployed();
  });

  it("and(false, false) returns false", async () => {
    const result = await instance.and(false, false);
    assert.equal(result, false);
  });

  it("and(true, false) returns false", async () => {
    const result = await instance.and(true, false);
    assert.equal(result, false);
  });

  it("and(false, true) returns false", async () => {
    const result = await instance.and(false, true);
    assert.equal(result, false);
  });

  it("and(true, true) returns true", async () => {
    const result = await instance.and(true, true);
    assert.equal(result, true);
  });

  it("or(false, false) returns false", async () => {
    const result = await instance.or(false, false);
    assert.equal(result, false);
  });

  it("or(false, true) returns true", async () => {
    const result = await instance.or(false, true);
    assert.equal(result, true);
  });

  it("or(true, false) returns true", async () => {
    const result = await instance.or(true, false);
    assert.equal(result, true);
  });

  it("or(true, true) returns true", async () => {
    const result = await instance.or(true, true);
    assert.equal(result, true);
  });

  it("not(false) returns true", async () => {
    const result = await instance.not(false);
    assert.equal(result, true);
  });

  it("not(true) returns false", async () => {
    const result = await instance.not(true);
    assert.equal(result, false);
  });

  it("xor(false, false) returns false", async () => {
    const result = await instance.xor(false, false);
    assert.equal(result, false);
  });

  it("xor(false, true) returns true", async () => {
    const result = await instance.xor(false, true);
    assert.equal(result, true);
  });

  it("xor(true, false) returns true", async () => {
    const result = await instance.xor(true, false);
    assert.equal(result, true);
  });

  it("xor(true, true) returns false", async () => {
    const result = await instance.xor(true, true);
    assert.equal(result, false);
  });
});
