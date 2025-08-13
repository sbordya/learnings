// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Following = artifacts.require("Following");

function arrayEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

contract("Following", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];
  const acc4 = accounts[4];
  const acc5 = accounts[5];

  before(async () => {
    instance = await Following.deployed({ from: owner });
  });

  it("acc1 can follow acc2", async () => {
    await instance.follow(acc2, { from: acc1 });
    const result = await instance.getFollowing(acc1);
    assert.ok(arrayEquals([acc2], result), "acc1 should be following acc2");
  });

  it("acc1 can follow acc3", async () => {
    await instance.follow(acc3, { from: acc1 });
    const result = await instance.getFollowing(acc1);
    assert.ok(
      arrayEquals([acc2, acc3], result),
      "acc1 should be following acc2 and acc3"
    );
  });

  it("acc1 can follow acc4", async () => {
    await instance.follow(acc4, { from: acc1 });
    const result = await instance.getFollowing(acc1);
    assert.ok(
      arrayEquals([acc2, acc3, acc4], result),
      "acc1 should be following acc2, acc3 and acc4"
    );
  });

  it("acc1 cannot follow acc5", async () => {
    try {
      await instance.follow(acc5, { from: acc1 });
      assert.ok(
        false,
        "follow should fail when address is already following 3 addresses"
      );
    } catch (error) {
      const result = await instance.getFollowing(acc1);
      assert.ok(
        arrayEquals([acc2, acc3, acc4], result),
        "acc1 should be following acc2, acc3 and acc4"
      );
    }
  });

  it("acc2 cannot follow itself", async () => {
    try {
      await instance.follow(acc2, { from: acc2 });
      assert.ok(false, "follow should fail when trying to follow own address");
    } catch (error) {
      const result = await instance.getFollowing(acc2);
      assert.ok(arrayEquals([], result), "acc2 should be following no one");
    }
  });
});
