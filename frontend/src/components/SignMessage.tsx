import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function SignMessage(){
    const {publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");

    const sign = async () => {
        if(!publicKey) throw new Error("Connect wallet first");
        if(!signMessage) throw new Error("Sign message not supported");
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);
        if(!signature) throw new Error("Signature not generated");
        alert("Message signed successfully");
        console.log(publicKey);
        if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
            throw new Error("Invalid signature");
        }
    }
    return (<div>
        <div className="flex flex-col items-center justify-center">
        <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" placeholder="Enter Message" onChange={(e) => setMessage(e.target.value)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" onClick={sign} disabled={!publicKey || !message}>Sign Message</button>
        </div>
    </div>)
}