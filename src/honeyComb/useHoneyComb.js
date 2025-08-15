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
import { BN } from "bn.js";
import base58 from "bs58";

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
      // const response = await signAndSendTransaction(txResponse);
      const response = await axios.post(`${BASE_URL}/user/createProfile`, {
        userPublicKey: user,
        fullName: fullName,
      });


      if (response.status === 200) {
        
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
          return response.data;
      }else{
        throw new Error("error occured");
        
      }
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

  const getUserProfile = async (publicKey) => {


    try {
      
    
    
    const response = await axios.post(`${BASE_URL}/user/fetchProfile`, {
        userPublicKey: publicKey,

      });



      console.log(response)
      if(response.status === 200 && response.data.message=== "No user found")
      {

        return "No user found"                  
      }else{
        const userData =response.data.user
        
        return userData;
      }


    
  
     
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

  const updateLevel = async (publicKey, level) => {

    try {
      
      const response = await axios.post(`${BASE_URL}/user/updateLevel`, {
        level:level,
        userPublicKey: publicKey
      });
      
      
      return response.data;
    } catch (error) {
     console.log(error) 
    }
    
  }

  const createCharacter = async () => {
    const response = await axios.post(`${BASE_URL}/user/getCharacter`, {
      userPublicKey: userPublicKey.toString(),
    });

    return response;
  };

  const sendPlayerOnMission = async () => {};



  const generateUserAuth = async () => {

        const { 
      authRequest: { message: authRequest } 
    } = await client.authRequest({
      wallet:userPublicKey
    });
    
    const encodedMessage = new TextEncoder().encode(authRequest);
    // Sign the message
    const signedUIntArray = await wallet.signMessage(encodedMessage);
    // Convert the signed message into a base58 encoded string
    const signature = base58.encode(signedUIntArray);
    // Send the signed message to the server
    const { authConfirm } = await client.authConfirm({ wallet: userPublicKey.toString(), signature });

     const {data} = await axios.post(`${BASE_URL}/user/recieveUserAuth`, {
      auth: authConfirm,
    });


   return {
    auth:data
   }
    
    
  }
  // file link

  return {
    updateLevel,
    generateUserAuth,
    createAccount,
    getUserProfile,
    addAchievement,
    createCharacter,
  };
};
