// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let instance;
  const acc0 = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];

  before(async () => {
    instance = await Voting.deployed();
  });

  it("should return correct winner when there is no votes", async () => {
    const winner = await instance.getCurrentWinner();
    assert.equal(1, winner, "winner should be 1");
  });

  it("should not allow invalid vote 10", async () => {
    try {
      await instance.vote(10, { from: acc0 });
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "vote should fail when called with 10");
  });

  it("should not allow invalid vote 0", async () => {
    try {
      await instance.vote(0, { from: acc0 });
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "vote should fail when called with 0");
  });

  it("should not allow retreiving invalid vote 10", async () => {
    try {
      await instance.getVotes(10);
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "getVotes should fail when called with 10");
  });

  it("should not allow retrieving invalid vote 0", async () => {
    try {
      await instance.getVotes(0);
    } catch (error) {
      return; // should fail
    }
    assert.ok(false, "getVotes should fail when called with 0");
  });

  it("acc0 can submit a single vote", async () => {
    await instance.vote(2, { from: acc0 });
    const votes = await instance.getVotes(2);
    assert.equal(1, votes, "2 should have 1 vote");

    try {
      await instance.vote(2, { from: acc0 });
      assert.ok(false, "vote() should fail when called twice by same account");
    } catch (error) {
      const votes2 = await instance.getVotes(2);
      assert.equal(
        1,
        votes2,
        "2 should have 1 vote, same account should not be able to vote twice"
      );
    }
  });

  it("should return correct winner after vote", async () => {
    const winner = await instance.getCurrentWinner();
    assert.equal(2, winner, "winner should be 2");
  });

  it("acc1 can submit a single vote", async () => {
    await instance.vote(2, { from: acc1 });
    const votes = await instance.getVotes(2);
    assert.equal(2, votes, "2 should have 2 votes");
  });

  it("acc2 can submit a single vote", async () => {
    await instance.vote(3, { from: acc2 });
    const votes = await instance.getVotes(3);
    assert.equal(1, votes, "3 should have 1 vote");
  });

  it("acc3 can submit a single vote", async () => {
    await instance.vote(3, { from: acc3 });
    const votes = await instance.getVotes(3);
    assert.equal(2, votes, "3 should have 2 votes");
  });

  it("should return correct winner after vote that results in a tie", async () => {
    const winner = await instance.getCurrentWinner();
    assert.equal(
      3,
      winner,
      "winner should be 3 as it is tied for the most votes and received the most recent vote"
    );
  });
});
