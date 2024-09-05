import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { ReactNode } from "react";
import * as web3 from "@solana/web3.js"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export function WalletContextProvider({ children }: { children: ReactNode }) {
  return (
    <ConnectionProvider endpoint={web3.clusterApiUrl("devnet")}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
