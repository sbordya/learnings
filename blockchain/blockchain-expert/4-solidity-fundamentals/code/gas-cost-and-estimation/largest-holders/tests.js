// This suite of tests is written to run against your code
// so that we can check its correctness.

const { assert } = require("chai");

const LargestHolder = artifacts.require("LargestHolder");

contract("LargestHolder", (accounts) => {
  let instance;
  const owner = accounts[0];

  const addresses = [
    "0x00Ca3D317Df810e1A45EF31e6a490086cb46006B",
    "0xeC4285608B1353dA27e67d444C2c06e10cCD0372",
    "0xC97eeEA001A12C7dD07c9E70F2756881B1645648",
    "0xec29f17A0e035e4B584ba10b0Ef51Aa1d434A68a",
    "0xD23EE42603a46209D505CF4C96D9719C5f097bDF",
    "0xB9Af978317e9B4691f40085931eA089b493FBd5D",
    "0xa0d5e8dD93B3A637615Aae8365A1E59a34A39104",
    "0x9Eda0966e97e39D9d49D711fA12781B7cF3a471c",
    "0xc64e25C1B7944098508bD5f69C1D74DF61C6d818",
    "0xf094B0193dC782771E59532b840D653d0aa0D356", //10
    "0xc18d7a35FF2460A59fe7050D97Ef5c1046CC4Bdf",
    "0xE30ED7D6b9Fe76014E51E3C65838Ae2fC2077057",
    "0xBf4C8cb212F704E633B71D1F451151567E92ED96",
    "0x47cb6D7e3B7e5E00e7AD85ab9a19Ef97F4bA12Ec",
    "0xebeAe807d6DC0480d904513d67E9c788eCbEd85B",
    "0x706d417cEC231ab20A978D09b5Fa5599c8e146AA",
    "0xDBD8B3f87524D4C7a2cB808f083a4D3a095c3c6d",
    "0xD6a1055b9aD558E7EA3DCD2D7f755eaAaECa0c1E",
    "0x198D4f4Dbc4e245FDA92fdAcca0F38C8C29dAC9F",
    "0xCfCA8F7a279C27Bba27350Df256D75af10349cf3", //20
    "0xAaB15Ef45cF4E6E77315129b835B2903671A741c",
    "0xF83dB4aA607F58CA1ddae4a6B5a3d5392d6918Ff",
    "0xDd28C4f8410a9A27B49D76c3821AB49CE90Abc54", //23
  ];

  const balances = [
    10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 98, 23,
  ];

  const largestHolder = addresses[21];

  before(async () => {
    instance = await LargestHolder.deployed({ from: owner });
  });

  it("cannot call process", async () => {
    try {
      await instance.process();
      assert.ok(false, "process() should fail when balances not submitted");
    } catch {
      return;
    }
  });

  it("cannot call numberOfTxRequired()", async () => {
    try {
      await instance.numberOfTxRequired();
      assert.ok(
        false,
        "numberOfTxRequired() should fail when balances not submitted"
      );
    } catch {
      return;
    }
  });

  it("cannot call getLargestHolder()", async () => {
    try {
      await instance.getLargestHolder();
      assert.ok(
        false,
        "getLargestHolder() should fail when balances not submitted"
      );
    } catch {
      return;
    }
  });

  it("submitBalances() works", async () => {
    try {
      await instance.submitBalances(balances, addresses);
    } catch {
      assert.ok(false, "submitBalances() should be successful");
    }
  });

  it("submitBalances() cannot be called twice", async () => {
    try {
      await instance.submitBalances(balances, addresses);
      assert.ok(
        false,
        "submitBalances() should not be able to be called twice"
      );
    } catch {
      return;
    }
  });

  it("numberOfTxRequired() returns correct number of txs", async () => {
    const result = await instance.numberOfTxRequired();
    assert.equal(3, result, "numberOfTxRequired() should return 3");
  });

  it("can call process() for the first time", async () => {
    try {
      await instance.process();
      const result = await instance.numberOfTxRequired();
      assert.equal(2, result, "numberOfTxRequired() should return 2");
    } catch {
      assert.ok(false, "process() should be successful");
    }
  });

  it("can call process() for the second time", async () => {
    try {
      await instance.process();
      const result = await instance.numberOfTxRequired();
      assert.equal(1, result, "numberOfTxRequired() should return 1");
    } catch {
      assert.ok(false, "process() should be successful");
    }
  });

  it("cannot call getLargestHolder()", async () => {
    try {
      await instance.getLargestHolder();
      assert.ok(
        false,
        "getLargestHolder() should fail when balances not submitted"
      );
    } catch {
      return;
    }
  });

  it("can call process() for the third time", async () => {
    try {
      await instance.process();
      const result = await instance.numberOfTxRequired();
      assert.equal(0, result, "numberOfTxRequired() should return 0");
    } catch {
      assert.ok(false, "process() should be successful");
    }
  });

  it("getLargestHolder() returns largest holder", async () => {
    try {
      const result = await instance.getLargestHolder();
      assert.equal(
        largestHolder,
        result,
        `largest holder should be ${LargestHolder}`
      );
    } catch (error) {
      console.log(error);
      assert.ok(false, "getLargestHolder() should be successful");
    }
  });

  it("cannot call process() for the fourth time", async () => {
    try {
      await instance.process();
      assert.ok(false, "process() should not be successful");
    } catch {
      return;
    }
  });
});
