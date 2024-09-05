import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function AppBar() {
  return (
    <div className="p-6 flex justify-between bg-black">
      <img src="/solanaLogo.png" alt="solanaLogo" className="h-10 w-96"/>
      <WalletMultiButton />
    </div>
  )
}
