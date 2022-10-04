import marswawa from "./marswawa.json";
import { web3 } from "./chain";
const Address = "0xb9c4259dCAa3688DE5de8E1B5a23fdB824fca14a";
let contract;
export async function getContract() {
    if (!contract) {
        contract = new web3.eth.Contract(marswawa, Address);
        console.log("== contract ==", { contract });
    }
    return contract;
}
