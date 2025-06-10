
import { ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {Buffer} from 'buffer';
Buffer.from('anything','base64');
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/Airdrop';
import { GetBalance } from './components/GetBalance';
import { SendTokens } from './components/SendTokens';
import { SignMessage } from './components/SignMessage';
import { ViewToken } from './components/view_tokens';

function App() {
  
  // Use the RPC_URL from the environment variables
const endpoint = process.env.RPC_URL || 'https://api.devnet.solana.com';

  return (
    <>
    <div className="flex flex-col items-center bg-slate-200 justify-center min-w-96">
      <div className="border rounded-b-md p-4 w-full max-w-lg shadow-lg bg-white">
        <div>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="flex items-center justify-between">
              <WalletMultiButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded" />
              <WalletDisconnectButton className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 border border-red-700 rounded" />
              </div>
                <h1 className="text-2xl font-bold text-center mt-4 mb-6">Solana Wallet Adapter</h1>
                <div className="flex flex-col items-center space-y-4">
                  <Airdrop />
                  <GetBalance />
                  <SendTokens />
                  <SignMessage />
                  <ViewToken />
                </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
      </div>
      </div>
    </>
  )
}

export default App;