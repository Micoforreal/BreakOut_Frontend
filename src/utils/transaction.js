// import { useWallet } from "@solana/wallet-adapter-react";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { client } from "./constants";



// const wallet = {}




export const signAndSendTransaction = async (transaction) => {

    if (!wallet.connected) {
        throw new Error("Wallet is not connected");
    }

    try {
        // const signedTransaction = await wallet.signTransaction(transaction);
        const txid = await sendClientTransactions(client, wallet, transaction);;
        return txid;
    } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
    }
}
