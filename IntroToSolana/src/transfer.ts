import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { API } from "./check-balance";

export async function transfer_sol(sender: Keypair, receiver: PublicKey, amount: number, network?: API) {

    console.log(`
Sender: ${sender.publicKey.toBase58()}
Receiver: ${receiver.toBase58()}
`);
    const net = network || API.devnet;
    const connection = new Connection(clusterApiUrl(net));
    const transaction = new Transaction();

    const sendSOLInstruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: amount,
    });

    transaction.add(sendSOLInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

    console.log(
        `💸 Finished! Sent ${amount} to the address ${receiver.toBase58()}. `,
    );
    console.log(`Transaction signature is ${signature}`);
}
