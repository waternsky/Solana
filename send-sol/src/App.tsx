import { AppBar } from "./components/AppBar"
import { BalanceDisplay } from "./components/BalanceDisplay"
import { HomePage } from "./components/HomePage"
import { WalletContextProvider } from "./components/WalletContextProvider"
import "@solana/wallet-adapter-react-ui/styles.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Transaction } from "./components/Transaction"

function App() {

  return (
    <WalletContextProvider> 
      <AppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/balance" element={<BalanceDisplay />}/>
          <Route path="/sendsol" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  )
}

export default App
