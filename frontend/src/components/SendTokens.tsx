import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction,  } from "@solana/web3.js";
import { useState } from "react";

export function SendTokens(){
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("0");
    
    const send = async () => {
        if(!wallet.publicKey){
            return;
        }
        const transaction = new Transaction().add(
            SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL
        }))
        const signTransaction = await wallet.sendTransaction(transaction, connection);
        if(!signTransaction) {
            throw new Error("Transaction not signed");
        }
        alert("Transaction sent successfully");
    }

    return (<div>
        <div className="flex flex-col items-center justify-center">
           <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" placeholder="Enter SOL" onChange={(e) => setAmount(e.target.value)}/>
           <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" placeholder="Enter public key" onChange={(e) => setTo(e.target.value)}/>
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" onClick={send} disabled={ !wallet.publicKey || !amount || parseFloat(amount) <=0 || !to}>Transfer</button>
            </div>
    </div>)
}