// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const TimedAuction = artifacts.require("TimedAuction");

const advanceTime = (time) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [time],
        id: new Date().getTime(),
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

contract("TimedAuction", (accounts) => {
  let instance;
  const owner = accounts[0];
  const acc1 = accounts[1];
  const acc2 = accounts[2];

  before(async () => {
    instance = await TimedAuction.deployed({ from: owner });
  });

  describe("before time limit up", () => {
    it("acc1 can bid", async () => {
      const result = await instance.bid({ from: acc1, value: 100 });
      const event = result.logs[0];
      assert.equal("Bid", event.event, "Bid event should be fired");
      assert.equal(acc1, event.args.sender, "sender should be acc1");
      assert.equal(100, event.args.amount, "amount should be 100");
      assert.isNotNull(event.args.timestamp, "timestamp should not be null");
    });

    it("acc1 cannot bid less than last amount", async () => {
      try {
        await instance.bid({ from: acc1, value: 90 });
        assert.ok(
          false,
          "bid should fail when called with too small of amount"
        );
      } catch {
        return;
      }
    });

    it("acc1 can bid again", async () => {
      const result = await instance.bid({ from: acc1, value: 110 });
      const event = result.logs[0];
      assert.equal("Bid", event.event, "Bid event should be fired");
      assert.equal(acc1, event.args.sender, "sender should be acc1");
      assert.equal(110, event.args.amount, "amount should be 100");
      assert.isNotNull(event.args.timestamp, "timestamp should not be null");
    });

    it("acc1 withdraw last bid", async () => {
      await instance.withdraw({ from: acc1 });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        110,
        newBalance,
        "contract balance should be 110 after withdraw"
      );
    });

    it("acc1 should be highest bidder", async () => {
      const result = await instance.getHighestBidder();
      assert.equal(acc1, result, "highest bidder should be acc1");
    });

    it("owner cannot destroy contract", async () => {
      try {
        await instance.claim({ from: owner });
        assert.ok(
          false,
          "owner should not be able to call claim() when auction still happening"
        );
      } catch {
        return;
      }
    });

    it("non-owner cannot destroy contract", async () => {
      try {
        await instance.claim({ from: acc1 });
        assert.ok(false, "acc1 should not be able to call claim");
      } catch {
        return;
      }
    });

    it("acc2 can send highest bid", async () => {
      const result = await instance.bid({ from: acc2, value: 200 });
      const event = result.logs[0];
      assert.equal("Bid", event.event, "Bid event should be fired");
      assert.equal(acc2, event.args.sender, "sender should be acc1");
      assert.equal(200, event.args.amount, "amount should be 100");
      assert.isNotNull(event.args.timestamp, "timestamp should not be null");
    });
  });

  describe("after time limit is up", () => {
    it("cannot bid after auction is done", async () => {
      await advanceTime(6 * 60);
      try {
        await instance.bid({ from: acc1, value: 250 });
        assert.ok(false, "bid should fail when auction is over");
      } catch {
        return;
      }
    });

    it("claim cannot be called until user withdraws", async () => {
      await advanceTime(6 * 60);
      try {
        await instance.claim({ from: owner });
        assert.ok(
          false,
          "owner should not be able to call claim() when users have pending withdrawls"
        );
      } catch {
        return;
      }
    });

    it("acc1 can withdraw", async () => {
      await advanceTime(6 * 60);
      await instance.withdraw({ from: acc1 });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        200,
        newBalance,
        "contract balance should be 250 after withdraw"
      );
    });

    it("acc1 cannot withdraw again", async () => {
      await advanceTime(6 * 60);
      await instance.withdraw({ from: acc1 });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(
        200,
        newBalance,
        "contract balance should be 250 after withdraw"
      );
    });

    it("claim can be called ", async () => {
      await advanceTime(6 * 60);
      await instance.claim({ from: owner });
      const newBalance = await web3.eth.getBalance(instance.address);
      assert.equal(0, newBalance, "contract balance should be 0 after claim");
    });
  });
});
