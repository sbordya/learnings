// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const basketballC = artifacts.require("BasketballGame");
const soccerC = artifacts.require("SoccerGame");

contract("ScoreTracker", (accounts) => {
  let basketball;
  let soccer;

  before(async () => {
    basketball = await basketballC.deployed();
    soccer = await soccerC.deployed();
  });

  describe("BasketballGame", async () => {
    it("homeTeamScored() doesn't accept invalid score", async () => {
      try {
        await basketball.homeTeamScored(4);
        assert.ok(false, "homeTeamScored(4) should fail");
      } catch {
        return;
      }
    });

    it("homeTeamScored() doesn't accept invalid score 2", async () => {
      try {
        await basketball.homeTeamScored(0);
        assert.ok(false, "homeTeamScored(0) should fail");
      } catch {
        return;
      }
    });

    it("awayTeamScored() doesn't accept invalid score", async () => {
      try {
        await basketball.awayTeamScored(4);
        assert.ok(false, "awayTeamScored(4) should fail");
      } catch {
        return;
      }
    });

    it("awayTeamScored() doesn't accept invalid score 2", async () => {
      try {
        await basketball.awayTeamScored(0);
        assert.ok(false, "awayTeamScored(0) should fail");
      } catch {
        return;
      }
    });

    it("homeTeamScored() works with valid score 1", async () => {
      await basketball.homeTeamScored(1);
    });

    it("homeTeamScored() works with valid score 2", async () => {
      await basketball.homeTeamScored(2);
    });

    it("homeTeamScored() works with valid score 3", async () => {
      await basketball.homeTeamScored(3);
    });

    it("awayTeamScored() works with valid score 1", async () => {
      await basketball.awayTeamScored(1);
    });

    it("awayTeamScored() works with valid score 2", async () => {
      await basketball.awayTeamScored(2);
    });

    it("awayTeamScored() works with valid score 3 ", async () => {
      await basketball.awayTeamScored(3);
    });

    it("awayTeamScored() works with valid score 4 ", async () => {
      await basketball.awayTeamScored(1);
    });
  });

  describe("SoccerGame", () => {
    it("homeTeamScore() works", async () => {
      await soccer.homeTeamScored();
    });

    it("awayTeamScore() works", async () => {
      await soccer.awayTeamScored();
    });

    it("awayTeamScore() works", async () => {
      await soccer.awayTeamScored();
    });
  });
});
