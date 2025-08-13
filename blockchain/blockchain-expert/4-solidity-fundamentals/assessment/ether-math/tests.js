// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const EtherMath = artifacts.require("EtherMath");

contract("EtherMath", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];
  const acc3 = accounts[3];

  before(async () => {
    instance = await EtherMath.deployed({ from: owner });
  });

  describe("before challenge created", () => {
    it("only owner can call submitChallenge", async () => {
      try {
        await instance.submitChallenge([1, 2, 3, 4, 5, 6], 10, {
          from: acc1,
          value: 10,
        });
        assert.ok(false, "submitChallenge() should fail");
      } catch {
        return;
      }
    });

    it("submit solution fails when challenge not created", async () => {
      try {
        await instance.submitSolution([1, 2, 3, 4, 5, 6], {
          from: acc1,
          value: 10,
        });
        assert.ok(false, "submitSolution() should fail");
      } catch {
        return;
      }
    });

    it("submit challenge fails when no reward sent", async () => {
      try {
        await instance.submitChallenge([1, 2, 3, 4, 5, 6], 10, {
          from: owner,
          value: 0,
        });
        assert.ok(false, "submitChallenge() should fail");
      } catch {
        return;
      }
    });

    it("submit challenge can be called by owner", async () => {
      try {
        await instance.submitChallenge([1, 2, 3, 4, 5, 6], 10, {
          from: owner,
          value: 1000,
        });
      } catch {
        assert.ok(false, "submitChallenge() should be successful");
      }
    });
  });

  describe("after challenge created", () => {
    it("submit challenge cannot be called by owner if challenge exists", async () => {
      try {
        await instance.submitChallenge([1, 2, 3, 4, 5, 6], 10, {
          from: owner,
          value: 100,
        });
        assert.ok(false, "submitChallenge() should fail");
      } catch {
        return;
      }
    });

    it("submit solution can be called by acc1", async () => {
      try {
        await instance.submitSolution([1, 2], {
          from: acc1,
        });
        await instance.claimRewards({ from: acc1 });
        assert.equal(
          100,
          await web3.eth.getBalance(instance.address),
          "user should not receive reward when submitting wrong answer"
        );
      } catch {
        return;
      }
    });

    it("submit solution cannot be called twice by acc1", async () => {
      try {
        await instance.submitSolution([1, 2], {
          from: acc1,
        });
        assert.ok(false, "submitSolution() should fail");
      } catch {
        return;
      }
    });

    it("submit solution can be called by acc2", async () => {
      try {
        await instance.submitSolution([7, 3], {
          from: acc2,
        });
        assert.ok(
          false,
          "submitSolution() should be fail because non-valid numbers are used"
        );
      } catch {
        return;
      }
    });

    it("submit solution can be called by acc3 with correct answer", async () => {
      try {
        await instance.submitSolution([6, 4], {
          from: acc3,
        });
        await instance.claimRewards({ from: acc3 });
        assert.equal(
          0,
          await web3.eth.getBalance(instance.address),
          "acc3 should be able to collect rewards"
        );
      } catch {
        assert.ok(false, "submitSolution() should be successful");
      }
    });
  });

  describe("new challenge", () => {
    it("submit challenge can be called by owner", async () => {
      try {
        await instance.submitChallenge([-5, -1], -9, {
          from: owner,
          value: 1000,
        });
      } catch {
        assert.ok(false, "submitChallenge() should be successful");
      }
    });

    it("acc1 can call submitSolution()", async () => {
      try {
        await instance.submitSolution([-5, -1, -1, -1, -1], {
          from: acc1,
        });
        await instance.claimRewards({ from: acc1 });
        assert.equal(
          0,
          await web3.eth.getBalance(instance.address),
          "acc1 should be able to collect rewards"
        );
      } catch {
        assert.ok(false, "submitSolution() should be successful");
      }
    });
  });
});
