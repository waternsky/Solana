import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { PUBLIC_KEY } from "./config";

enum API {
    mainnet = "mainnet-beta",
    devnet = "devnet",
}

async function get_balance(address: PublicKey, api: API) {
    const connection = new Connection(clusterApiUrl(api));
    const balanceInLamports = await connection.getBalance(address);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`💰 Finished! The balance for the wallet at address ${address} is ${balanceInSOL}!`);

    return balanceInSOL;
}


async function main() {
    const address = process.argv[2];
    if (!address) throw Error("Please provide valid address!");
    const pubKey = new PublicKey(address);

    await get_balance(pubKey, API.mainnet);
    await get_balance(PUBLIC_KEY, API.devnet);
}

main();
