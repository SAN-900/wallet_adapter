import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { PublicKey} from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const ViewToken = ()=>{

const wallet = useWallet();
const publickey = wallet.publicKey?.toString() || '';
const { connection } = useConnection();
const [ balance, setBalance] = useState(0);
const getTokens = async () => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey(publickey),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
    setBalance(Number(accountData.amount / BigInt(LAMPORTS_PER_SOL))); 
  })

}
  return (<div>
            <div className="flex flex-col items-center justify-center">
            <input className="border rounded-md py-3 px-4 placeholder:text-xl border-slate-500 m-2 w-full max-w-xs" type="text" disabled placeholder="Enter Message" value={balance}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" onClick={getTokens}>View Token Balance</button>
            </div>
    </div>)
};