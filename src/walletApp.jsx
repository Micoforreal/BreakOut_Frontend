import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,

} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";

import "./index.css"
import "@solana/wallet-adapter-react-ui/styles.css"; // UI styles
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const SolanaWalletProvider = ({children}) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <div style={{ margin: "20px"}}>
            <WalletMultiButton  style={{backgroundColor:"" , borderRadius:"20px"}} class="md:text-lg"/>
          </div> */}


                {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};



export default SolanaWalletProvider;
