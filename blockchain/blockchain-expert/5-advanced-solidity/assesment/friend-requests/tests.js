// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Friends = artifacts.require("Friends");

contract("Friends", (accounts) => {
  let instance;
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];

  before(async () => {
    instance = await Friends.deployed();
  });

  it("can send friend request", async () => {
    await instance.sendFriendRequest(acc2, { from: acc1 });
    const result = await instance.getFriendRequests({ from: acc2 });
    assert.ok(
      result.includes(acc1),
      "acc2 should have friend request from acc1"
    );
  });

  it("cannot send duplicate friend request", async () => {
    try {
      await instance.sendFriendRequest(acc2, { from: acc1 });
      assert.ok(false, "sending duplicate request should fail");
    } catch {
      return;
    }
  });

  it("cannot send friend request to self", async () => {
    try {
      await instance.sendFriendRequest(acc2, { from: acc2 });
      assert.ok(false, "sending request to self should fail");
    } catch {
      return;
    }
  });

  it("cannot accept request that doesn't exist", async () => {
    try {
      await instance.acceptFriendRequest(acc2, { from: acc2 });
      assert.ok(false, "accepting request that doesn't exist should fail");
    } catch {
      return;
    }
  });

  it("getNumberOfFriends returns accurate number", async () => {
    const result = await instance.getNumberOfFriends({ from: acc1 });
    assert.equal(0, result, "acc2 should have 0 friends");
  });

  it("getFriends returns accurate friends", async () => {
    const result = await instance.getFriends({ from: acc1 });
    assert.equal(0, result, "acc2 should have 0 friends");
  });

  it("can accept friend request ", async () => {
    await instance.acceptFriendRequest(acc1, { from: acc2 });
    const acc1Friends = await instance.getNumberOfFriends({ from: acc2 });
    const acc2Friends = await instance.getNumberOfFriends({ from: acc2 });
    assert.equal(1, acc1Friends, "acc1 should have 1 friend");
    assert.equal(1, acc2Friends, "acc2 should have 1 friend");

    const acc1FriendList = await instance.getFriends({ from: acc1 });
    const acc2FriendList = await instance.getFriends({ from: acc2 });
    assert.ok(acc1FriendList.includes(acc2), "acc1 should have acc2 as friend");
    assert.ok(acc2FriendList.includes(acc1), "acc2 should have acc1 as friend");
  });

  it("has correct friend requests", async () => {
    const result = await instance.getFriendRequests({ from: acc1 });
    assert.equal(0, result.length, "acc1 should have no friend requests");
  });

  it("cannot send friend request to friend", async () => {
    try {
      await instance.sendFriendRequest(acc2, { from: acc1 });
      assert.ok(false, "sending request to existing friend should fail");
    } catch {
      return;
    }
  });

  it("can send 2nd friend request", async () => {
    await instance.sendFriendRequest(acc3, { from: acc1 });
    const result = await instance.getFriendRequests({ from: acc3 });
    assert.ok(
      result.includes(acc1),
      "acc3 should have friend request from acc1"
    );
  });

  it("can accept friend request ", async () => {
    await instance.acceptFriendRequest(acc1, { from: acc3 });
    const acc1Friends = await instance.getNumberOfFriends({ from: acc1 });
    const acc3Friends = await instance.getNumberOfFriends({ from: acc3 });
    assert.equal(2, acc1Friends, "acc1 should have 2 friends");
    assert.equal(1, acc3Friends, "acc3 should have 1 friend");

    const acc1FriendList = await instance.getFriends({ from: acc1 });
    const acc3FriendList = await instance.getFriends({ from: acc3 });
    assert.ok(acc1FriendList.includes(acc3), "acc1 should have acc3 as friend");
    assert.ok(acc1FriendList.includes(acc2), "acc1 should have acc2 as friend");
    assert.ok(acc3FriendList.includes(acc1), "acc2 should have acc1 as friend");
  });
});
