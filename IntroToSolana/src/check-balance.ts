import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export enum API {
    mainnet = "mainnet-beta",
    devnet = "devnet",
}

export async function get_balance(address: PublicKey, api?: API) {
    const net = api || API.devnet;
    const connection = new Connection(clusterApiUrl(net));
    const balanceInLamports = await connection.getBalance(address);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`💰 Finished! The balance for the wallet at address ${address} is ${balanceInSOL}!`);

    return balanceInSOL;
}
