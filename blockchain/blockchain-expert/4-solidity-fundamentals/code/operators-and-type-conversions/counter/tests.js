// This suite of tests is written to run against your code
// so that we can check its correctness.

const Counter = artifacts.require("Counter");

contract("Counter", (accounts) => {
  let instance;

  before(async () => {
    instance = await Counter.deployed();
  });

  it("increment should add one to count", async () => {
    await instance.increment();
    assert.equal(await instance.count(), 1);
  });

  it("decrement should subtract one from count", async () => {
    await instance.decrement();
    assert.equal(await instance.count(), 0);
  });

  it("addBy should add 5 to count", async () => {
    await instance.addBy(5);
    assert.equal(await instance.count(), 5);
  });

  it("subtractBy should subtract 3 from count", async () => {
    await instance.subtractBy(3);
    assert.equal(await instance.count(), 2);
  });

  it("multiplyBy should multiply count by 5", async () => {
    await instance.multiplyBy(5);
    assert.equal(await instance.count(), 10);
  });

  it("getMinutesElapsed should return correct minutes", async () => {
    await instance.multiplyBy(13);
    assert.equal(await instance.getMinutesElapsed(), 2);
  });
});
