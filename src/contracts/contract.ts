import marswawa from "./marswawa.json";

import {Contract} from "web3-eth-contract";
import {AbiItem} from "web3-utils";

import {ChainId, web3} from "./chain";

let contract: Contract;
export async function getContract() {
  if (!contract) {
    const networkId = ChainId;
    // @ts-ignore
    const network = poker.networks[networkId];
    contract = new web3.eth.Contract(
      marswawa as AbiItem[],
      network && network.address
    );
    console.log("== contract ==", {contract, networkId, network});
  }
  return contract;
}
