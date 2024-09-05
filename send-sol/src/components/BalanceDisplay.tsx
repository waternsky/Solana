import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import * as React from "react"
import * as web3 from "@solana/web3.js"

export function BalanceDisplay() {

  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = React.useState(0)

  React.useEffect(() => {
    if (!connection || !publicKey) return

    connection.onAccountChange(
      publicKey,
      updatedBalance => setBalance(updatedBalance.lamports / web3.LAMPORTS_PER_SOL),
      "confirmed"
    )

    connection.getAccountInfo(publicKey)
      .then(info => setBalance(info ? info.lamports / web3.LAMPORTS_PER_SOL : 0))
  }, [connection, publicKey])

  return (
    <div className="text-center">
      {publicKey ? <div className="m-2 text-3xl bg-slate-900 text-white border border-black rounded">Balance: {balance}</div> : ""}
    </div>
  )
}
