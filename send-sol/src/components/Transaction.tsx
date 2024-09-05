import * as React from "react"
import * as web3 from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function Transaction() {

  const [address, setAddress] = React.useState("")
  const [amt, setAmt] = React.useState("")

  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  return (
    <div className="m-2 flex justify-center bg-slate-900 p-6">
      <form
        className="border border-black flex flex-col justify-center w-96"
        onSubmit={async (e) => {
          e.preventDefault()

          if (!publicKey || !connection) return

          const transaction = new web3.Transaction()

          const instruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new web3.PublicKey(address),
            lamports: +amt * web3.LAMPORTS_PER_SOL
          })

          transaction.add(instruction)

          console.log("here")

          const signature = await sendTransaction(transaction, connection)

          console.log(signature)
          alert(signature)
        }}
      >
        <label htmlFor="address" className="text-xl text-white p-2">Address: </label>
        <input type="text" id="address" value={address} className="p-2 rounded-lg"
          onChange={(e) => setAddress(e.target.value)} autoComplete="on" />
        <br />
        <label htmlFor="amount" className="text-xl text-white p-2">Amount: </label>
        <input type="text" id="amount" value={amt} className="p-2 rounded-lg"
          onChange={(e) => setAmt(e.target.value)} />
        <br />
        <input type="submit" className="p-2 border border-white text-white text-xl rounded-lg" />
      </form>
    </div>
  )
}
