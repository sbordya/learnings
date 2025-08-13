// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Inventory = artifacts.require("Inventory");

contract("Inventory", (accounts) => {
  let instance;

  before(async () => {
    instance = await Inventory.deployed();
  });

  it("addItem(1, 10) should add item with id 1, quantity 10", async () => {
    await instance.addItem(1, 10);
    assert.equal(
      await instance.getQuantity(1),
      10,
      "quantity for id 1 should be 10"
    );
  });

  it("addItem(1, 10) should add item with id 1, quantity 10", async () => {
    await instance.addItem(1, 10);
    assert.equal(
      await instance.getQuantity(1),
      20,
      "quantity for id 1 should be 20"
    );
  });

  it("addItem(10, 100) should add item with id 10, quantity 100", async () => {
    await instance.addItem(10, 100);
    assert.equal(
      await instance.getQuantity(10),
      100,
      "quantity for id 10 should be 100"
    );
  });

  it("getQuantity should return -1 for non-existent item", async () => {
    assert.equal(
      await instance.getQuantity(5),
      -1,
      "quantity fro id 5 should be -1"
    );
  });
});
