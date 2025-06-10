import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function GetBalance(){
    const wallet = useWallet();
    const { connection } = useConnection();
    const [sol, setSol] = useState(0);

    const showBalance = async () => {
     if(!wallet.publicKey){
        return;
     }
     console.log(wallet.publicKey.toString());
     const balance = await connection.getBalance(wallet.publicKey, 'confirmed');
     setSol(balance/LAMPORTS_PER_SOL);
    }

    return (<div>
        <div className="flex flex-col items-center justify-center">
            <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" disabled placeholder="Enter Message" value={sol+" SOL"}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" onClick={showBalance}>Get Balance</button>
            </div>
    </div>)
}