// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const MathUtils = artifacts.require("MathUtils");

contract("MathUtils", (accounts) => {
  let instance;

  before(async () => {
    instance = await MathUtils.deployed();
  });

  describe("floor tests", () => {
    it("floor rounds 101 to 100", async () => {
      const result = await instance.floor(101);
      assert.equal(100, result, "floor(101) should return 100");
    });

    it("floor rounds -100 to -100", async () => {
      const result = await instance.floor(-100);
      assert.equal(-100, result, "floor(-100) should return -100");
    });

    it("floor rounds 34 to 30", async () => {
      const result = await instance.floor(34);
      assert.equal(30, result, "floor(34) should return 30");
    });

    it("floor rounds -95 to -90", async () => {
      const result = await instance.floor(-95);
      assert.equal(-90, result, "floor(-95) should return -90");
    });

    it("floor rounds 0 to 0", async () => {
      const result = await instance.floor(0);
      assert.equal(0, result, "floor(0) should return 0");
    });

    it("floor rounds 9 to 0", async () => {
      const result = await instance.floor(9);
      assert.equal(0, result, "floor(9) should return 0");
    });

    it("floor rounds -6 to 0", async () => {
      const result = await instance.floor(-6);
      assert.equal(0, result, "floor(-6) should return 0");
    });

    it("floor rounds -67262 to -67260", async () => {
      const result = await instance.floor(-67262);
      assert.equal(-67260, result, "floor(-67262) should return -67260");
    });
  });

  describe("ceil tests", () => {
    it("ceil rounds 101 to 100", async () => {
      const result = await instance.ceil(101);
      assert.equal(110, result, "ceil(101) should return 110");
    });

    it("ceil rounds 1 to 10", async () => {
      const result = await instance.ceil(1);
      assert.equal(10, result, "ceil(1) should return 10");
    });

    it("ceil rounds -1 to -10", async () => {
      const result = await instance.ceil(-1);
      assert.equal(-10, result, "ceil(-1) should return -10");
    });

    it("ceil rounds -876 to -880", async () => {
      const result = await instance.ceil(-876);
      assert.equal(-880, result, "ceil(-876) should return -880");
    });

    it("ceil rounds 0 to 0", async () => {
      const result = await instance.ceil(0);
      assert.equal(0, result, "ceil(0) should return 0");
    });

    it("ceil rounds 63 to 70", async () => {
      const result = await instance.ceil(63);
      assert.equal(70, result, "ceil(63) should return 70");
    });

    it("ceil rounds -22 to -30", async () => {
      const result = await instance.ceil(63);
      assert.equal(70, result, "ceil(70) should return 70");
    });

    it("ceil rounds 670 to 670", async () => {
      const result = await instance.ceil(670);
      assert.equal(670, result, "ceil(670) should return 670");
    });
  });

  describe("average tests", () => {
    it("all positive average test", async () => {
      const result = await instance.average([1, 2, 2, 3, 3, 2, 1], true);
      assert.equal(
        0,
        result,
        "average([1, 2, 2, 3, 3, 2, 1], true) should return 0"
      );
    });

    it("all positive average test 2", async () => {
      const result = await instance.average(
        [1, 2, 2, 3, 3, 2, 1, 7, 8, 9],
        false
      );
      assert.equal(10, result, "average() should return 10");
    });

    it("all negative average test", async () => {
      const result = await instance.average(
        [-9, -20, -90, -2, -3, -1, -4, -2],
        false
      );
      assert.equal(
        -20,
        result,
        "average([-9, -20, -90, -2, -3, -1, -4, -2], false) should return -20"
      );
    });

    it("all negative average test 2", async () => {
      const result = await instance.average(
        [-9, -20, -90, -2, -3, -1, -4, -2],
        true
      );
      assert.equal(
        -10,
        result,
        "average([-9, -20, -90, -2, -3, -1, -4, -2], true) should return -10"
      );
    });

    it("zero average test", async () => {
      const result = await instance.average([], false);
      assert.equal(0, result, "average([], false) should return 0");
    });

    it("zero average test 2", async () => {
      const result = await instance.average([], true);
      assert.equal(0, result, "average([], true) should return 0");
    });

    it("random average test 2", async () => {
      const result = await instance.average(
        [
          33388, 53114, 8670, 61913, 80186, 964, 88418, 98473, 11328, 8547,
          84882, 69855, 294, 3893, 53503, 15974, 14791, 96912, 3789, 63849,
          75170, 80659, 25047, 34114, 13380, 39032, 62727, 40942, 13242, 3855,
          12086, 70511, 50158, 16817, 66996, 29715, 10090, 66927, 2874, 93267,
          6598, 99292, 96025, 63660, 69304, 73537, 18368, 84380, 82269, 90569,
          43189, 60634, 48179, 61104, 56170, 69605, 90605, 24462, 38211, 89923,
          87513, 67618, 36542, 76841, 60578, 37604, 54784, 20950, 61860, 5373,
          23748, 55858, 12940, 26231, 70116, 48711, 43373, 16718, 22945, 52356,
          73587, 82330, 49242, 38874, 90067, 7723, 42419, 89469, 93063, 70314,
          94487, 66331, 42014, 8079, 46648, 51516, 51580, 4603, 22458, 27124,
        ],
        true
      );
      assert.equal(48610, result, "average(..., true) should return 48610");
    });
  });
});
