// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Car = artifacts.require("Car");

contract("Car", (accounts) => {
  let instance;

  before(async () => {
    instance = await Car.deployed(); // fuelTankSize: 100, KilometersPerLitre: 10
  });

  it("can't drive when engine stopped", async () => {
    try {
      await instance.drive(10);
      assert.ok(false, "can't drive when engine stopped");
    } catch {
      return;
    }
  });

  it("can start engine", async () => {
    await instance.startEngine();
  });

  it("can't drive when no gas", async () => {
    try {
      await instance.drive(10);
      assert.ok(false, "can't drive when no gas");
    } catch {
      return;
    }
  });

  it("can't fuel up when started", async () => {
    try {
      await instance.fuelUp(10);
      assert.ok(false, "should not be able to fuel up when started");
    } catch {
      return;
    }
  });

  it("can fuel up when stopped", async () => {
    await instance.stopEngine();
    await instance.fuelUp(10);
    const result = await instance.kilometersRemaining();
    assert.equal(100, result, "should have 100km");
  });

  it("can't fuel up invalid amount", async () => {
    try {
      await instance.fuelUp(100);
      assert.ok(false, "can't fuel up invalid amount");
    } catch {
      return;
    }
  });

  it("can't drive invalid amount", async () => {
    try {
      await instance.startEngine();
      await instance.drive(110);
      assert.ok(false, "can't drive invalid amount");
    } catch {
      return;
    }
  });

  it("can drive ", async () => {
    await instance.stopEngine();
    await instance.startEngine();
    await instance.drive(100);
    const result = await instance.kilometersRemaining();
    assert.equal(0, result, "should have 0km remaining");
  });

  it("can fuel up when stopped 2", async () => {
    await instance.stopEngine();
    await instance.fuelUp(25);
    const result = await instance.kilometersRemaining();
    assert.equal(250, result, "should have 250km");
  });

  it("can drive 2", async () => {
    await instance.startEngine();
    await instance.drive(150);
    const result = await instance.kilometersRemaining();
    assert.equal(100, result, "should have 100km remaining");
  });
});
