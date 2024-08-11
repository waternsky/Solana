import "dotenv/config"
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";

const keypair = Keypair.generate();
console.log("Generated keypair");

console.log("Public key:", keypair.publicKey.toBase58());
console.log("Private key:", keypair.secretKey);

const secret_key = process.env["SECRET_KEY"];
if (!secret_key) throw Error("SECRET_KEY is not set");
const byteArr = base58.decode(secret_key);
const key_pair_env = Keypair.fromSecretKey(byteArr);
console.log(key_pair_env);
