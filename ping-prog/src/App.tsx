import * as web3 from "@solana/web3.js"
import * as React from "react"
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

function App() {

  const endpoint = web3.clusterApiUrl("devnet")
  const wallets = React.useMemo(() => [], [])

  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <AppBar />
          </WalletModalProvider>
          <BalanceDisplay />
          <PingButton />
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App

function AppBar() {
  return (
    <div className="px-5 py-1 flex flex-row justify-between text-center bg-stone-500">
      <img src="/solanaLogo.png" className="h-1/5 w-1/5 m-3 p-1" />
      <span className="text-5xl p-1 text-white">Ping Program</span>
      <div className="m-2 p-1 text-white">
        <WalletMultiButton />
      </div>
    </div>
  )
}

function BalanceDisplay() {

  const [balance, setBalance] = React.useState(0)
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  React.useEffect(() => {
    if (!publicKey || !connection) return

    connection.onAccountChange(
      publicKey,
      updatedAccountInfo => {
        setBalance(updatedAccountInfo.lamports / web3.LAMPORTS_PER_SOL)
      },
      "confirmed",
    )

    connection.getAccountInfo(publicKey)
      .then(info => setBalance(info ? info.lamports : 0))
  }, [connection, publicKey])

  return (
    <div className="text-center text-3xl">{publicKey ? `Balance: ${balance}` : ""}</div>
  )
}


function PingButton() {
  
  const {  sendTransaction } = useWallet()
  const { connection } = useConnection()

  return (
    <div className="text-center m-5">
      <button className="m-auto p-4 text-xl border border-black rounded"
        onClick={async (e) => {
          e.preventDefault()

          const transaction = new web3.Transaction()

          const instruction = new web3.TransactionInstruction({
            programId: new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"),
            keys: [
              {
                pubkey: new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"),
                isSigner: false,
                isWritable: true
              }
            ]
          })

          transaction.add(instruction)
          const signature = await sendTransaction(transaction, connection)
          console.log(signature)
        }}
      >Ping!</button>
    </div>
  )
}
