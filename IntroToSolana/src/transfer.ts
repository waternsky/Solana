import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { keypair, PUBLIC_KEY } from "./config";
import { API } from "./check-balance";

const sendTo = process.argv[2];
if (!sendTo) throw Error("Please provide public key to send to");

const receiverPubKey = new PublicKey(sendTo);
const senderPubKey = PUBLIC_KEY;
const senderKeypair = keypair;

const connection = new Connection(clusterApiUrl(API.devnet));

console.log(`
Sender: ${PUBLIC_KEY}
Receiver: ${sendTo}
`);

async function transfer_sol() {

    const transaction = new Transaction();

    const LAMPORTS_TO_SEND = 5000;

    const sendSOLInstruction = SystemProgram.transfer({
        fromPubkey: senderPubKey,
        toPubkey: receiverPubKey,
        lamports: LAMPORTS_TO_SEND,
    });

    transaction.add(sendSOLInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

    console.log(
        `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${receiverPubKey}. `,
    );
    console.log(`Transaction signature is ${signature}!`);
}

transfer_sol();
