import React from "react";
import GameMenu from "./gameMenu";
import SolanaWalletProvider from "./WalletApp";
import { UserContextProvider } from "./context/userContext";

function ReactApp( ) {
    return(
        <SolanaWalletProvider>
        <UserContextProvider>

            <GameMenu/>
        </UserContextProvider>
        </SolanaWalletProvider>
    )
}

export default ReactApp