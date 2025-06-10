import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("0");

    async function requestAirdrop() {
        if(!wallet.publicKey) {
            alert("connect wallet first");
            return;
        }
        const signTransaction =  await connection.requestAirdrop(wallet.publicKey, parseFloat(amount) * LAMPORTS_PER_SOL);
        if(!signTransaction) {
            throw new Error("Airdrop request failed");
        }
        alert("Airdrop request sent successfully");
    }

    return <div>
        <div className="flex flex-col items-center justify-center">
        <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" placeholder="Amount"  onChange={(e) => setAmount(e.target.value)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" onClick={requestAirdrop}  disabled={!wallet.publicKey || !amount || parseFloat(amount) <= 0}>Request Airdrop</button>
    </div>
    </div>
}