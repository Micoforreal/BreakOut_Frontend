import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import "./index.css"
import "@solana/wallet-adapter-react-ui/styles.css"; // UI styles

const WalletApp = () => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const endpoint = "https://api.mainnet-beta.solana.com";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ margin: "20px"}}>
            <WalletMultiButton  style={{backgroundColor:"" , borderRadius:"20px"}} class=""/>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletApp;
