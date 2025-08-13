// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const Employee = artifacts.require("Employee");
const Manager = artifacts.require("Manager");

contract("Blockchain Workplace", (accounts) => {
  let employee;
  let manager;

  before(async () => {
    employee = await Employee.deployed();
    manager = await Manager.deployed();
  });

  it("employee returns correct name", async () => {
    const name = await employee.getFirstName();
    assert.equal("Employee", name, "Employee 1 name should be Employee");
  });

  it("employee returns correct pay", async () => {
    const pay = await employee.getWeeklyPay(40); // $30/hour
    assert.equal(1200, pay, "pay should be");
  });

  it("manager returns correct pay", async () => {
    const pay = await manager.getWeeklyPay(35); // $40/hour
    assert.equal(1400, pay, "pay should be");
  });

  it("manager returns correct pay 2", async () => {
    const pay = await manager.getWeeklyPay(90); // $40/hour
    assert.equal(5600, pay, "pay should be");
  });

  it("can add subordinate", async () => {
    await manager.addSubordinate("Employee", "employee", 30, 1);
    const names = await manager.getSubordinates();
    assert.ok(names.includes("Employee"), "Employee should be a subordinate");
  });

  it("can add 2nd subordinate", async () => {
    await manager.addSubordinate("Employee2", "employee", 40, 1);
    const names = await manager.getSubordinates();
    assert.ok(names.includes("Employee"), "Employee should be a subordinate");
    assert.ok(names.includes("Employee2"), "Employee2 should be a subordinate");
  });
});
