import web3 from "@solana/web3.js";
import { API } from "./check-balance";
import { airdropIfRequired } from "@solana-developers/helpers";
import { keypair } from "./config";


async function airdrop(connection: web3.Connection): Promise<number> {
    const newBalance = await airdropIfRequired(
        connection,
        keypair.publicKey,
        1 * web3.LAMPORTS_PER_SOL,
        0.5 * web3.LAMPORTS_PER_SOL
    );
    return newBalance;
}

const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

async function signIt(connection: web3.Connection, transaction: web3.Transaction, keypair: web3.Keypair): Promise<string> {
    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
    );
    return signature;
}

async function main() {
    const connection = new web3.Connection(web3.clusterApiUrl(API.devnet));

    const balance = await airdrop(connection);
    console.log(`Balance is ${balance}`);

    const transaction = new web3.Transaction();
    const progId = PING_PROGRAM_ADDRESS;
    const progDataId = PING_PROGRAM_DATA_ADDRESS;

    const instruction = new web3.TransactionInstruction({
        programId: progId,
        keys: [
            {
                pubkey: progDataId,
                isSigner: false,
                isWritable: true
            }
        ],
    });

    transaction.add(instruction);

    const signature = await signIt(connection, transaction, keypair);
    console.log(`Transaction completed! Signature is ${signature}`);
}

main();
