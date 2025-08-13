// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const ShoppingList = artifacts.require("ShoppingList");

contract("ShoppingList", (accounts) => {
  let instance;
  const acc0 = accounts[0];
  const acc1 = accounts[1];

  before(async () => {
    instance = await ShoppingList.deployed();
  });

  it("acc0 can create list", async () => {
    await instance.createList("list1", { from: acc0 });
    const result = await instance.getListNames({ from: acc0 });
    assert.deepEqual(["list1"], result, "acc0 should have one list");
  });

  it("acc0 cannot create same list", async () => {
    try {
      await instance.createList("list1", { from: acc0 });
      assert.ok(false, "should not be able to create list with duplicate name");
    } catch {
      return;
    }
  });

  it("acc0 cannot create list with empty name", async () => {
    try {
      await instance.createList("", { from: acc0 });
      assert.ok(false, "should not be able to create list with empty name");
    } catch {
      return;
    }
  });

  it("acc1 can create list", async () => {
    await instance.createList("list1", { from: acc1 });
    const result = await instance.getListNames({ from: acc1 });
    assert.deepEqual(["list1"], result, "acc1 should have one list");
  });

  it("acc1 can create second list", async () => {
    await instance.createList("list2", { from: acc1 });
    const result = await instance.getListNames({ from: acc1 });
    assert.deepEqual(["list1", "list2"], result, "acc1 should have two lists");
  });

  it("acc0 can get list items", async () => {
    const result = await instance.getItemNames("list1", { from: acc1 });
    assert.deepEqual([], result, "acc0 should have no items in list1");
  });

  it("acc0 cannot get list items of non-existing list", async () => {
    try {
      await instance.getListNames("list3", { from: "acc1" });
      assert.ok(
        false,
        "getListNames should fail when called with non-existing list"
      );
    } catch {
      return;
    }
  });

  it("acc1 can add item", async () => {
    await instance.addItem("list1", "milk", 2, { from: acc1 });
    const result = await instance.getItemNames("list1", { from: acc1 });
    assert.deepEqual(["milk"], result, "acc1 list1 should contain milk");
  });

  it("cannot get item names from non-existing list", async () => {
    try {
      await instance.getItemNames("list3", { from: acc1 });
      assert.ok(
        false,
        "should not be able to call getItemNames on non-existing list"
      );
    } catch {
      return;
    }
  });

  it("acc1 can add second item", async () => {
    await instance.addItem("list1", "eggs", 3, { from: acc1 });
    const result = await instance.getItemNames("list1", { from: acc1 });
    assert.deepEqual(
      ["milk", "eggs"],
      result,
      "acc1 list1 should contain milk and eggs"
    );
  });

  it("acc0 can add item", async () => {
    await instance.addItem("list1", "eggs", 3, { from: acc0 });
    const result = await instance.getItemNames("list1", { from: acc0 });
    assert.deepEqual(["eggs"], result, "acc0 list1 should contain eggs");
  });
});
