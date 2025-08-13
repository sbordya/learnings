// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const EtherElection = artifacts.require("EtherElection");

contract("EtherElection", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];
  const acc4 = accounts[4];
  const acc5 = accounts[5];
  const acc6 = accounts[6];
  const acc7 = accounts[7];
  const acc8 = accounts[8];
  const acc9 = accounts[9];

  before(async () => {
    instance = await EtherElection.deployed({ from: owner });
  });

  describe("enroll phase", () => {
    it("cannot vote until candidates selected", async () => {
      try {
        await instance.vote(acc2, { from: acc1 });
        assert.ok(false, "vote() should fail when candidates not selected");
      } catch {
        return;
      }
    });

    it("cannot claimReward if voting not done", async () => {
      try {
        await instance.claimReward({ from: acc1 });
        assert.ok(
          false,
          "claimReward() should fail when candidates not selected"
        );
      } catch {
        return;
      }
    });

    it("cannot collectFees if voting not done", async () => {
      try {
        await instance.collectFees({ from: owner });
        assert.ok(
          false,
          "collectFees() should fail when candidates not selected"
        );
      } catch {
        return;
      }
    });

    it("cannot getWinner if voting not done", async () => {
      try {
        await instance.getWinner({ from: owner });
        assert.ok(
          false,
          "getWinner() should fail when candidates not selected"
        );
      } catch {
        return;
      }
    });

    it("acc1 can enrol as candidate", async () => {
      try {
        await instance.enroll({
          from: acc1,
          value: web3.utils.toWei("1", "ether"),
        });
      } catch {
        assert.ok(false, "enroll() should be successful");
      }
    });

    it("acc1 cannot enrol as candidate 2nd time", async () => {
      try {
        await instance.enroll({
          from: acc1,
          value: web3.utils.toWei("1", "ether"),
        });
        assert.ok(
          false,
          "enroll() should fail when called by existing candidate"
        );
      } catch {
        return;
      }
    });

    it("acc2 cannot enrol as candidate when more than one ether sent", async () => {
      try {
        await instance.enroll({
          from: acc2,
          value: web3.utils.toWei("2", "ether"),
        });
        assert.ok(
          false,
          "enroll() should fail when called with more than 1 ether"
        );
      } catch {
        return;
      }
    });

    it("acc2 cannot enrol as candidate when less than one ether sent", async () => {
      try {
        await instance.enroll({
          from: acc2,
          value: web3.utils.toWei("0.5", "ether"),
        });
        assert.ok(
          false,
          "enroll() should fail when called with less than 1 ether"
        );
      } catch {
        return;
      }
    });

    it("acc2 can enrol as candidate", async () => {
      try {
        await instance.enroll({
          from: acc2,
          value: web3.utils.toWei("1", "ether"),
        });
      } catch {
        assert.ok(false, "enroll() should be successful");
      }
    });

    it("acc3 can enrol as candidate", async () => {
      try {
        await instance.enroll({
          from: acc3,
          value: web3.utils.toWei("1", "ether"),
        });
      } catch {
        assert.ok(false, "enroll() should be successful");
      }
    });
  });

  describe("voting phase", () => {
    it("acc4 cannot enrol as candidate when 3 already selected", async () => {
      try {
        await instance.enroll({
          from: acc3,
          value: web3.utils.toWei("1", "ether"),
        });
        assert.ok(
          false,
          "enroll() should fail when 3 candidates already selected"
        );
      } catch {
        return;
      }
    });

    it("candidate can vote for themselves", async () => {
      try {
        await instance.vote(acc1, {
          from: acc1,
          value: 10000,
        });
      } catch {
        assert.ok(false, "vote() should be successful");
      }
    });

    it("user cannot vote twice", async () => {
      try {
        await instance.vote(acc1, {
          from: acc1,
          value: 10000,
        });
        assert.ok(false, "vote() should fail when called twice by same user");
      } catch {
        return;
      }
    });

    it("user cannot vote for non existing candidate", async () => {
      try {
        await instance.vote(acc6, {
          from: acc2,
          value: 10000,
        });
        assert.ok(
          false,
          "vote() should fail when called with non existing candidate"
        );
      } catch {
        return;
      }
    });

    it("user cannot vote when incorrect fee passed", async () => {
      try {
        await instance.vote(acc3, {
          from: acc2,
          value: 1000,
        });
        assert.ok(false, "vote() should fail when called with wrong fee");
      } catch {
        return;
      }
    });

    it("users can vote", async () => {
      try {
        await instance.vote(acc1, {
          from: acc2,
          value: 10000,
        });
        await instance.vote(acc1, {
          from: acc3,
          value: 10000,
        });
        await instance.vote(acc1, {
          from: acc4,
          value: 10000,
        });
        await instance.vote(acc2, {
          from: acc5,
          value: 10000,
        });
        await instance.vote(acc2, {
          from: acc6,
          value: 10000,
        });
        await instance.vote(acc3, {
          from: acc7,
          value: 10000,
        });
        await instance.vote(acc1, {
          from: acc8,
          value: 10000,
        });
      } catch (error) {
        assert.ok(false, "vote() should be successful");
      }
    });
  });

  describe("collection phase", () => {
    it("winner should be acc1", async () => {
      try {
        const result = await instance.getWinner({
          from: acc9,
        });
        assert.equal(acc1, result, "winner should be acc1");
      } catch {
        assert.ok(false, "getWinner() should be successful");
      }
    });

    it("user cannot vote when winner selected", async () => {
      try {
        await instance.vote(acc2, {
          from: acc9,
          value: 10000,
        });
        assert.ok(
          false,
          "vote() should fail when called after winner selected"
        );
      } catch {
        return;
      }
    });

    it("owner cannot call collectFees() until winner withdrew", async () => {
      try {
        await instance.collectFees({
          from: owner,
        });
        assert.ok(
          false,
          "collectFees() should fail when called before winner withdrew"
        );
      } catch {
        return;
      }
    });

    it("non winner cannot call claimReward()", async () => {
      try {
        await instance.claimReward({
          from: owner,
        });
        assert.ok(false, "claimReward() should fail when called by non winner");
      } catch {
        return;
      }
    });

    it("winner can call claimReward()", async () => {
      try {
        await instance.claimReward({
          from: acc1,
        });
        const newBalance = await web3.eth.getBalance(instance.address);

        assert.equal(
          80000,
          newBalance,
          "smart contract balance should be 3 ether less after withdraw"
        );
      } catch {
        assert.ok(false, "claimReward() should be successful");
      }
    });

    it("winner cannot call claimReward() 2nd time", async () => {
      try {
        await instance.claimReward({
          from: acc1,
        });
        assert.ok(false, "claimReward() should fail when called twice");
      } catch {
        return;
      }
    });

    it("non-owner cannot call collectFees()", async () => {
      try {
        await instance.collectFees({
          from: acc1,
        });
        assert.ok(false, "collectFees() should fail when called by non-owner");
      } catch {
        return;
      }
    });

    it("owner can call collectFees()", async () => {
      try {
        await instance.collectFees({
          from: owner,
        });
        const newBalance = await web3.eth.getBalance(instance.address);
        assert.equal(0, newBalance, "smart contract balance should be 0");
      } catch {
        assert.ok(false, "collectFees() should be successful");
      }
    });

    it("contract state should be cleared", async () => {
      try {
        await instance.getWinner({
          from: owner,
        });
        assert.ok(false, "getWinner() should fail after collectFees called");
      } catch {
        return;
      }
    });
  });
});
