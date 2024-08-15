import { PublicKey } from "@solana/web3.js";
import { API, get_balance } from "./check-balance";
import { keypair } from "./config";
import { transfer_sol } from "./transfer";



export async function main() {
    const address = process.argv[2];
    if (!address) throw Error("Please provide valid address!");
    const pubKey = new PublicKey(address);

    await get_balance(pubKey, API.mainnet);
    await get_balance(keypair.publicKey);


    await transfer_sol(keypair, pubKey, 5000);
}

main();
