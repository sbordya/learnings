// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const GridMaker = artifacts.require("GridMaker");

const validateGrid = (array, value, rows, cols) => {
  for (let row; row < rows; row++) {
    for (let col; col < cols; col++) {
      let val;
      try {
        val = array[row][col];
      } catch (error) {
        console.log(error);
        return false;
      }

      if (val === value) continue;
      return false;
    }
  }

  return true;
};

contract("GridMaker", (accounts) => {
  let instance;
  const owner = accounts[0];

  before(async () => {
    instance = await GridMaker.deployed({ from: owner });
  });

  it("make2DIntGrid returns correct grid", async () => {
    const result = await instance.make2DIntGrid(3, 3, 1);
    assert.ok(
      validateGrid(result, 1, 3, 3),
      "make2DIntGrid should return correc grid"
    );
  });

  it("make2DIntGrid returns correct grid - 2", async () => {
    const result = await instance.make2DIntGrid(1, 5, 10);
    assert.ok(
      validateGrid(result, 1, 5, 10),
      "make2DIntGrid should return correc grid"
    );
  });

  it("make2DIntGrid returns correct grid - 3", async () => {
    const result = await instance.make2DIntGrid(7, 3, -100);
    assert.ok(
      validateGrid(result, 7, 3, -100),
      "make2DIntGrid should return correc grid"
    );
  });

  it("make2DIntGrid returns correct grid - 4", async () => {
    const result = await instance.make2DIntGrid(0, 3, -100);
    assert.ok(
      validateGrid(result, 0, 3, -100),
      "make2DIntGrid should return correc grid"
    );
  });

  it("make2DIntGrid returns correct grid - 5", async () => {
    const result = await instance.make2DIntGrid(3, 0, -100);
    assert.ok(
      validateGrid(result, 3, 0, -100),
      "make2DIntGrid should return correc grid"
    );
  });

  it("make2DAddressGrid returns correct grid - 1", async () => {
    const result = await instance.make2DAddressGrid(3, 3, { from: owner });
    assert.ok(
      validateGrid(result, 3, 3, owner),
      "make2DAddressGrid should return correc grid"
    );
  });

  it("make2DAddressGrid returns correct grid - 2", async () => {
    const result = await instance.make2DAddressGrid(3, 0, { from: owner });
    assert.ok(
      validateGrid(result, 3, 0, owner),
      "make2DAddressGrid should return correc grid"
    );
  });

  it("make2DAddressGrid returns correct grid - 3", async () => {
    const result = await instance.make2DAddressGrid(0, 3, { from: owner });
    assert.ok(
      validateGrid(result, 0, 3, owner),
      "make2DAddressGrid should return correc grid"
    );
  });

  it("make2DAddressGrid returns correct grid - 4", async () => {
    const result = await instance.make2DAddressGrid(7, 5, { from: owner });
    assert.ok(
      validateGrid(result, 7, 5, owner),
      "make2DAddressGrid should return correc grid"
    );
  });

  it("make2DAddressGrid returns correct grid - 5", async () => {
    const result = await instance.make2DAddressGrid(2, 10, { from: owner });
    assert.ok(
      validateGrid(result, 2, 10, owner),
      "make2DAddressGrid should return correc grid"
    );
  });
});
