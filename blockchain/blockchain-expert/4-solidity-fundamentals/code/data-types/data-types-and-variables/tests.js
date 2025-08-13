// This suite of tests is written to run against your code
// so that we can check its correctness.

const DataTypes = artifacts.require("DataTypes");

contract("DataTypes", (accounts) => {
  it("small number should be equal to 9", async () => {
    const instance = await DataTypes.deployed();
    assert.equal(await instance.smallNumber(), 9);
  });

  it("negativeNumber should be equal to -7", async () => {
    const instance = await DataTypes.deployed();
    assert.equal(await instance.negativeNumber(), -7);
  });

  it("zeroAddress should be equal to 0", async () => {
    const instance = await DataTypes.deployed();
    assert.equal(await instance.zeroAddress(), 0);
  });

  it("canEdit should be equal to true", async () => {
    const instance = await DataTypes.deployed();
    assert.equal(await instance.canEdit(), true);
  });
});
