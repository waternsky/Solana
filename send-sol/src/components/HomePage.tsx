import { useNavigate } from "react-router-dom"

export function HomePage() {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="m-6 h-auto border border-black flex justify-between w-2/3">
          <button className="m-1 py-2 px-4 border border-black rounded font-bold bg-purple-700 text-white"
            onClick={() => navigate("/balance")}
          >Show Balance</button>
          <button className="m-1 py-2 px-4 border border-black rounded font-bold bg-purple-700 text-white"
            onClick={() => navigate("/sendsol")}
          >Send Solana</button>
        </div>
      </div>
    </div>
  )
}
