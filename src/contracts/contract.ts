import marswawa from "./marswawa.json";

import {Contract} from "web3-eth-contract";
import {AbiItem} from "web3-utils";

import {ChainId, Address, web3} from "./chain";

let contract: Contract;
export async function getContract() {
  if (!contract) {
    contract = new web3.eth.Contract(marswawa as AbiItem[], Address);
    console.log("== contract ==", {contract});
  }
  return contract;
}
