// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const StringGenerator = artifacts.require("StringGenerator");

contract("StringGenerator", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];
  const acc4 = accounts[4];
  const acc5 = accounts[5];

  before(async () => {
    instance = await StringGenerator.deployed({ from: owner });
  });

  it("owner can add character", async () => {
    await instance.addCharacter("a", { from: owner });
    const result = await instance.getString();
    assert.equal("a", result, "getString() should return 'a'");
  });

  it("owner cannot add second character", async () => {
    try {
      await instance.addCharacter("a", { from: owner });
      assert.ok(
        false,
        "addCharacter() should fail when called by address that has already added character"
      );
    } catch (error) {
      const result = await instance.getString();
      assert.equal("a", result, "getString() should return 'a'");
    }
  });

  it("acc1 cannot add length 2 string", async () => {
    try {
      await instance.addCharacter("ab", { from: acc1 });
      assert.ok(
        false,
        "addCharacter() should fail when called with a string of length 2"
      );
    } catch (error) {
      const result = await instance.getString();
      assert.equal("a", result, "getString() should return 'a'");
    }
  });

  it("acc1 cannot add length 0 string", async () => {
    try {
      await instance.addCharacter("", { from: acc1 });
      assert.ok(
        false,
        "addCharacter() should fail when called with a string of length 0"
      );
    } catch (error) {
      const result = await instance.getString();
      assert.equal("a", result, "getString() should return 'a'");
    }
  });

  it("acc1 can add character", async () => {
    await instance.addCharacter("b", { from: acc1 });
    const result = await instance.getString();
    assert.equal("ab", result, "getString() should return 'ab'");
  });

  it("acc2 can add character", async () => {
    await instance.addCharacter("c", { from: acc2 });
    const result = await instance.getString();
    assert.equal("abc", result, "getString() should return 'abc'");
  });

  it("acc3 can add character", async () => {
    await instance.addCharacter("d", { from: acc3 });
    const result = await instance.getString();
    assert.equal("abcd", result, "getString() should return 'abcd'");
  });

  it("acc4 can add character", async () => {
    await instance.addCharacter("e", { from: acc4 });
    const result = await instance.getString();
    assert.equal("abcde", result, "getString() should return 'abcde'");
  });

  it("acc5 cannot add character when string length is 5", async () => {
    try {
      await instance.addCharacter("a", { from: acc5 });
      assert.ok(
        false,
        "addCharacter() should fail when string length is already 5"
      );
    } catch (error) {
      const result = await instance.getString();
      assert.equal("abcde", result, "getString() should return 'abcde'");
    }
  });
});
