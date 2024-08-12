import "dotenv/config";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";


const pvtKey = process.env["SECRET_KEY"];
if (!pvtKey) throw Error("SECRET_KEY is not set");
const byteArr = base58.decode(pvtKey);
const keypair = Keypair.fromSecretKey(byteArr);

export const PUBLIC_KEY = keypair.publicKey;
console.log(PUBLIC_KEY.toBase58());
