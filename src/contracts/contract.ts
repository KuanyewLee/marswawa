import marswawa from "./marswawa.json";

import {Contract} from "web3-eth-contract";
import {AbiItem} from "web3-utils";

import {ChainId, web3} from "./chain";

const Address = "0xb9c4259dCAa3688DE5de8E1B5a23fdB824fca14a";

let contract: Contract;
export async function getContract() {
  if (!contract) {
    contract = new web3.eth.Contract(marswawa as AbiItem[], Address);
    console.log("== contract ==", {contract});
  }
  return contract;
}
