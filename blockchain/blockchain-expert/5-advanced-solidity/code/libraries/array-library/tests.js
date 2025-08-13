// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Array = artifacts.require("Array");

contract("Array", (accounts) => {
  let instance;

  before(async () => {
    instance = await Array.deployed();
  });

  describe("test indexOf()", () => {
    it("indexOf() should return correct index 1", async () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = await instance.indexOf(arr, 10);
      assert.equal(9, result, "indexOf() should return 9");
    });

    it("indexOf() should return correct index 2", async () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = await instance.indexOf(arr, 1);
      assert.equal(0, result, "indexOf() should return 0");
    });

    it("indexOf() should return correct index 3", async () => {
      const arr = [];
      const result = await instance.indexOf(arr, 1);
      assert.equal(-1, result, "indexOf() should return -1");
    });

    it("indexOf() should return correct index 4", async () => {
      const arr = [5, 6, 7, -9, -10, -10, -10, -10];
      const result = await instance.indexOf(arr, -10);
      assert.equal(4, result, "indexOf() should return 4");
    });

    it("indexOf() should return correct index 5", async () => {
      const arr = [5, 6, 7, -9, -10, -10, -10, -10];
      const result = await instance.indexOf(arr, -10);
      assert.equal(4, result, "indexOf() should return 4");
    });
  });

  describe("test count()", () => {
    it("count() should return correct count 1", async () => {
      const arr = [5, 6, 7, -9, -10, -10, -10, -10];
      const result = await instance.count(arr, -10);
      assert.equal(4, result, "count() should return 4");
    });

    it("count() should return correct count 2", async () => {
      const arr = [5, 6, 7, -9, -10, -10, -10, -10];
      const result = await instance.count(arr, 100);
      assert.equal(0, result, "count() should return 0");
    });

    it("count() should return correct count 3", async () => {
      const arr = [7, 7, 8, 7, 7, 6, 5, 7, 7];
      const result = await instance.count(arr, 7);
      assert.equal(6, result, "count() should return 6");
    });

    it("count() should return correct count 4", async () => {
      const arr = [];
      const result = await instance.count(arr, 7);
      assert.equal(0, result, "count() should return 0");
    });
  });

  describe("test sum()", () => {
    it("sum() should return correct sum 1", async () => {
      const arr = [5, 6, 7, -9, -10, -10, -10, -10];
      const result = await instance.sum(arr);
      assert.equal(-31, result, "sum() should return -31");
    });

    it("sum() should return correct sum 2", async () => {
      const arr = [];
      const result = await instance.sum(arr);
      assert.equal(0, result, "sum() should return 0");
    });

    it("sum() should return correct sum 3", async () => {
      const arr = [1, -1, 2, 0, 0, 2, 2];
      const result = await instance.sum(arr);
      assert.equal(6, result, "sum() should return 6");
    });

    it("sum() should return correct sum 4", async () => {
      const arr = [-10, 9, 8, 7, 3, 4, 1, 3, -9, 0, 8, 7, 2, 100];
      const result = await instance.sum(arr);
      assert.equal(133, result, "sum() should return 133");
    });

    it("sum() should return correct sum 5", async () => {
      const arr = [1];
      const result = await instance.sum(arr);
      assert.equal(1, result, "sum() should return 1");
    });
  });
});
