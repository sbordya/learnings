// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Comparison = artifacts.require("Comparison");

contract("Comparison", (accounts) => {
  let instance;

  before(async () => {
    instance = await Comparison.deployed();
  });

  it("compare(10, 20) should return -1", async () => {
    const result = await instance.compare(10, 20);
    assert.equal(result, -1);
  });

  it("compare(10, 10) should return 0", async () => {
    const result = await instance.compare(10, 10);
    assert.equal(result, 0);
  });

  it("compare(10, -5) should return 1", async () => {
    const result = await instance.compare(10, -5);
    assert.equal(result, 1);
  });
});
