import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const env = "test";
console.log("env", env);

const variables = {
  prod: {
    network: "homestead",
    tokenAddress: "dai.tokens.ethers.eth",
    tokenHolder: "0x7bB1678998c93Fa698b66F81bf599d0C08137ff1",
  },
  test: {
    network: "sepolia",
    tokenAddress: "0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A",
    tokenHolder: "0xAd635C85F4D3Fa7f599823a50876d583eB54e040",
  },
};
const { network, tokenAddress, tokenHolder } = variables[env];
const provider = new ethers.InfuraProvider(network, process.env.INFURA_API_KEY);
const blockNumber = await provider.getBlockNumber();
console.log(blockNumber);

const daiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",
  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const daiContract = new ethers.Contract(tokenAddress, daiAbi, provider);
const balance = await daiContract.balanceOf(tokenHolder);
console.log("name", await daiContract.name());
console.log("symbol", await daiContract.symbol());
console.log("balanceOf", balance);
console.log("balanceOf formatUnits", ethers.formatUnits(balance, 18));

//daiContract.on("Transfer", (from, to, amount) => console.log(from, to, amount));
const filter = daiContract.filters.Transfer(tokenHolder);
//const filter = daiContract.filters.Transfer(null, tokenHolder);
const result = await daiContract.queryFilter(filter);
//const result = await daiContract.queryFilter(filter, -1000);
console.log(result);
