import marswawa from "./marswawa.json";
import { Address, web3 } from "./chain";
let contract;
export async function getContract() {
    if (!contract) {
        contract = new web3.eth.Contract(marswawa, Address);
        console.log("== contract ==", { contract });
    }
    return contract;
}
