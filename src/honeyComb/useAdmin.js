import { useWallet } from "@solana/wallet-adapter-react";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { client } from "../utils/constants";

export const useAdmin = () => {
  const wallet = useWallet();

  const createProject = async () => {
    const {
      createCreateProjectTransaction: {
        project: projectAddress, // Save this project address in your database, you'll need it to interact with the Web3 side of your app
        tx: txResponse, // This is the transaction response you'll need to send to the blockchain after signing
      },
    } = await client.createCreateProjectTransaction({
      name: "My First Project",
      authority: wallet.publicKey.toString(),
      profileDataConfig: {
        achievements: ["Soldier", "Slayer", "Hero", "Assassin"],
        customDataFields: [
          "weapons",
          "xp",
          "gold",
          "characters",
          "missionsCompleted",
          "questCompleted",
        ],
      },
    });



   const response=  await sendClientTransactions(client, wallet, txResponse);

console.log(response)
   return response
  };




  return {
    createProject
  }
};
