// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const TaxedItem = artifacts.require("TaxedItem");

contract("TaxedItem", (accounts) => {
  let instance;

  before(async () => {
    instance = await TaxedItem.deployed();
  });

  it("name is test", async () => {
    const name = await instance.getName();
    assert.equal("test", name, "getName() should return test");
  });

  it("price is 15", async () => {
    const price = await instance.getPrice();
    assert.equal(15, price, "getPrice() should return 15");
  });
});
