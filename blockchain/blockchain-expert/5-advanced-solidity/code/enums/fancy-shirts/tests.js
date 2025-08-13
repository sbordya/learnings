// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const FancyShirts = artifacts.require("FancyShirts");

contract("FancyShirts", (accounts) => {
  let instance;
  const acc0 = accounts[0];
  const acc1 = accounts[1];

  before(async () => {
    instance = await FancyShirts.deployed();
  });

  it("returns correct price 1", async () => {
    const price = await instance.getShirtPrice(0, 0); // small, red
    assert.equal(10, price, "price for small red shirt should be 10");
  });

  it("returns correct price 2", async () => {
    const price = await instance.getShirtPrice(0, 1); // small, green
    assert.equal(15, price, "price for small green shirt should be 15");
  });

  it("returns correct price 3", async () => {
    const price = await instance.getShirtPrice(0, 2); // small, blue
    assert.equal(15, price, "price for small blue shirt should be 15");
  });

  it("returns correct price 4", async () => {
    const price = await instance.getShirtPrice(1, 0); // medium, red
    assert.equal(15, price, "price for medium red shirt should be 15");
  });

  it("returns correct price 5", async () => {
    const price = await instance.getShirtPrice(1, 1); // medium, green
    assert.equal(20, price, "price for medium green shirt should be 20");
  });

  it("returns correct price 6", async () => {
    const price = await instance.getShirtPrice(1, 2); // medium, blue
    assert.equal(20, price, "price for medium blue shirt should be 20");
  });

  it("returns correct price 7", async () => {
    const price = await instance.getShirtPrice(2, 0); // large, red
    assert.equal(20, price, "price for large red shirt should be 20");
  });

  it("returns correct price 8", async () => {
    const price = await instance.getShirtPrice(2, 1); // large, green
    assert.equal(25, price, "price for large green shirt should be 25");
  });

  it("returns correct price 9", async () => {
    const price = await instance.getShirtPrice(2, 2); // large, blue
    assert.equal(25, price, "price for large blue shirt should be 25");
  });

  it("acc1 can buy shirt", async () => {
    await instance.buyShirt(0, 0, { from: acc1, value: 10 }); // small, red
    const shirts = await instance.getShirts(0, 0, { from: acc1 });
    assert.equal(1, shirts, "getShirts(small, red) should return 1");
  });

  it("acc1 cannot buy shirt with incorrect amount", async () => {
    try {
      await instance.buyShirt(0, 1, { from: acc1, value: 10 });
      assert.ok(false, "byShirt() should fail");
    } catch {
      return;
    }
  });

  it("acc1 ahs no medium blue shirts", async () => {
    const shirts = await instance.getShirts(1, 1, { from: acc1 });
    assert.equal(0, shirts, "getShirts(medium, blue) should return 0");
  });

  it("acc0 can buy shirt", async () => {
    await instance.buyShirt(2, 2, { from: acc0, value: 25 });
    const shirts = await instance.getShirts(2, 2, { from: acc0 });
    assert.equal(1, shirts, "getShirts(large, blue) should return 1");
  });

  it("acc0 can buy another shirt", async () => {
    await instance.buyShirt(2, 2, { from: acc0, value: 25 });
    const shirts = await instance.getShirts(2, 2, { from: acc0 });
    assert.equal(2, shirts, "getShirts(large, blue) should return 2");
  });

  it("acc0 can buy another shirt", async () => {
    await instance.buyShirt(1, 1, { from: acc0, value: 20 });
    const shirts = await instance.getShirts(1, 1, { from: acc0 });
    assert.equal(1, shirts, "getShirts(medium, green) should return 1");
  });
});
