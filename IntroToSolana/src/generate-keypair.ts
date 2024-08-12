import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = Keypair.generate();
console.log("Generated keypair");

console.log("Public key:", keypair.publicKey.toBase58());
console.log("Private key:", keypair.secretKey);

const secret_key = process.env["SECRET_KEY"];
if (!secret_key) throw Error("SECRET_KEY is not set");
const byteArr = base58.decode(secret_key);
const key_pair_env = Keypair.fromSecretKey(byteArr);
console.log(key_pair_env);


const keyenv = getKeypairFromEnvironment("SECRET_KEY");
console.log(keyenv);


export const getKeypairFromEnvironmentTest = (variableName: string) => {
  const secretKeyString = process.env[variableName];
  if (!secretKeyString) {
    throw new Error(`Please set '${variableName}' in environment.`);
  }

  // Try the shorter base58 format first
  let decodedSecretKey: Uint8Array;
  try {
    decodedSecretKey = base58.decode(secretKeyString);
    return Keypair.fromSecretKey(decodedSecretKey);
  } catch (throwObject) {
    const error = throwObject as Error;
    if (!error.message.includes("Non-base58 character")) {
      throw new Error(
        `Invalid secret key in environment variable '${variableName}'!`,
      );
    }
  }

  // Try the longer JSON format
  try {
    decodedSecretKey = Uint8Array.from(JSON.parse(secretKeyString));
  } catch (error) {
    throw new Error(
      `Invalid secret key in environment variable '${variableName}'!`,
    );
  }
  return Keypair.fromSecretKey(decodedSecretKey);
};

const keyenvtest = getKeypairFromEnvironmentTest("SECRET_KEY");
console.log(keyenvtest);
