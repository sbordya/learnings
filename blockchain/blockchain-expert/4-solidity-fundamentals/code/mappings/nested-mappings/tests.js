// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const DebtTracking = artifacts.require("DebtTracking");

contract("DebtTracking", (accounts) => {
  let instance;
  const addr1 = "0xa08F73261A7A1f533A50CB1DcfFEd9594b623FF5";
  const addr2 = "0x86e382f34dEe09944C3bfe172095E95D5bb76e62";
  const addr3 = "0x9bE29F2c838e646D809eCE62AC60da923C94806a";

  before(async () => {
    instance = await DebtTracking.deployed();
  });

  it("should add debt between addr1 and addr2", async () => {
    await instance.addDebt(addr1, addr2, 10);
    assert.equal(
      await instance.getDebt(addr1, addr2),
      10,
      "addr2 should owe addr1 10 ether"
    );
  });

  it("should add debt between addr1 and addr3", async () => {
    await instance.addDebt(addr1, addr3, 15);
    assert.equal(
      await instance.getDebt(addr1, addr3),
      15,
      "addr3 should owe addr1 15 ether"
    );
  });

  it("should add more debt between addr1 and addr2", async () => {
    await instance.addDebt(addr1, addr2, 15);
    assert.equal(
      await instance.getDebt(addr1, addr2),
      25,
      "addr2 should owe addr1 25 ether"
    );
  });

  it("addr3 can pay back addr1", async () => {
    await instance.payDebt(addr1, addr3, 10);
    assert.equal(
      await instance.getDebt(addr1, addr3),
      5,
      "addr3 should owe addr1 5 ether"
    );
  });

  it("addr3 can pay back addr1 again", async () => {
    await instance.payDebt(addr1, addr3, 5);
    assert.equal(
      await instance.getDebt(addr1, addr3),
      0,
      "addr3 should owe addr1 0 ether"
    );
  });

  it("addr2 can pay back addr1 again", async () => {
    await instance.payDebt(addr1, addr2, 10);
    assert.equal(
      await instance.getDebt(addr1, addr2),
      15,
      "addr2 should owe addr1 15 ether"
    );
  });
});
