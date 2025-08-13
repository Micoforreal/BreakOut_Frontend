import { useWallet } from "@solana/wallet-adapter-react";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import {
  ADMIN_PUBLIC_KEY,
  BASE_URL,
  CHARACTER_ASSEMBLER_ADDRESS,
  CHARACTER_MODEL_ADDRESS,
  client,
  PROJECT_ADDRESS,
} from "../utils/constants";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { id } from "zod/v4/locales";
import { use } from "react";
import axios from "axios";

export const useHoneyComb = () => {
  const wallet = useWallet();
  const { connected, publicKey: userPublicKey } = useWallet();

  const signAndSendTransaction = async (transaction) => {
    if (!wallet.connected) {
      throw new Error("Wallet is not connected");
    }

    try {
      // const signedTransaction = await wallet.signTransaction(transaction);
      const txid = await sendClientTransactions(client, wallet, transaction);
      return txid;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };

  const createAccount = async ({ fullName, user }) => {
    try {
      const {
        createNewUserWithProfileTransaction: txResponse, // This is the transaction response, you'll need to sign and send this transaction
      } = await client.createNewUserWithProfileTransaction({
        project: PROJECT_ADDRESS,
        wallet: user.toString(),
        profileIdentity: "main",
        userInfo: {
          name: fullName,
          bio: "",
          pfp: "",
        },
      });

      const response = await signAndSendTransaction(txResponse);

      Toastify({
        text: "Account created successfully!",
        duration: 3000,

        newWindow: true,
        close: true,

        position: "right",
        stopOnFocus: true,

        style: {
          borderRadius: "10px",

          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      console.log("Transaction response:", response);
      return response;
    } catch (error) {
      console.error("Error creating account:", error);
      Toastify({
        text: "something went wrong! please try again ",
        duration: 3000,

        newWindow: true,
        close: true,

        position: "right",
        stopOnFocus: true,

        style: {
          borderRadius: "10px",

          background: "linear-gradient(to right,#BA0104, #D35763)",
        },
      }).showToast();
    }
  };

  const getUserProfile = async () => {
    try {
      const users = await client
        .findUsers({
          wallets: [userPublicKey.toString()], // String array of users' wallet addresses
          addresses: [],
          ids: [],
          includeProof: true,
        })
        .then(({ user }) => user);

      const characterArray = await client
        .findCharacters({
          addresses: [],
          includeProof: true,
          filters: {},
          mints: [],
          trees: [],
          wallets: [userPublicKey.toString()], // Array of wallet public keys as a string (wallets that own the characters)
          attributeHashes: [], // Array of attribute hashes as a string
        })
        .then(({ character }) => character);

      const usersArray = await client
        .findProfiles({
          // All filters below are optional
          userIds: [users[0].id],
          projects: [PROJECT_ADDRESS], // String array of project addresses
          addresses: [],
          identities: [],
          includeProof: true,
        })
        .then(({ profile }) => profile);

      console.log(usersArray);

      if (usersArray.length === 0) {
        return "No user found";
      }

      const userData = [
        {
          id: usersArray[0].id,
          userAddress: usersArray[0].address,
          fullName: usersArray[0].info.name,
          xp: usersArray[0].platformData.xp,
          characterAddress: characterArray[0].address,
        },
      ];

      return userData;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      Toastify({
        text: "Failed to fetch user profile. Please try again.",
        duration: 3000,

        newWindow: true,
        close: true,

        position: "right",
        stopOnFocus: true,

        style: {
          borderRadius: "10px",

          background: "linear-gradient(to right, #BA0104, #D35763)",
        },
      }).showToast();
    }
  };

  const addAchievement = async (profileAddress, xp) => {
    try {
      const response = await axios.post(`${BASE_URL}/addAchievement`, {
        profileAddress: profileAddress,
        xp: xp,
      });

      if (response.status === 200) {
        Toastify({
          text: "you have been awarded 10 XP!",
          duration: 3000,
          newWindow: true,
          close: true,
          position: "right",
          stopOnFocus: true,
          style: {
            borderRadius: "10px",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      }

      return response.data;
    } catch (error) {
      Toastify({
        text: "Failed to add achievement. Please try again.",
        duration: 3000,

        newWindow: true,
        close: true,

        position: "right",
        stopOnFocus: true,

        style: {
          borderRadius: "10px",

          background: "linear-gradient(to right, #BA0104, #D35763)",
        },
      }).showToast();
    }
  };

  const createCharacter = async () => {
    const response = await axios.post(`${BASE_URL}/userCharacter`, {
      userPublicKey: userPublicKey.toString(),
    });

    return response;
  };


  const sendPlayerOnMission = async ()=>{
    
  }
  // file link

  return {
    createAccount,
    getUserProfile,
    addAchievement,
    createCharacter,
  };
};
