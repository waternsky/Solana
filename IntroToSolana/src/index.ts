import { PublicKey } from "@solana/web3.js";
import { API, get_balance } from "./check-balance";
import { PUBLIC_KEY } from "./config";



export async function main() {
    const address = process.argv[2];
    if (!address) throw Error("Please provide valid address!");
    const pubKey = new PublicKey(address);

    await get_balance(pubKey, API.mainnet);
    await get_balance(PUBLIC_KEY, API.devnet);
}

main();
