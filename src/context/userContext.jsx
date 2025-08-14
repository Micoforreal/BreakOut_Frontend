import React, { useLayoutEffect } from "react";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useHoneyComb } from "../honeyComb/useHoneyComb";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfileModal from "../components/ProfileModal";

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { getUserProfile, addAchievement ,createCharacter,generateUserAuth } = useHoneyComb();
  const { connected, publicKey, wallet } = useWallet();

  const [showProfileModal, setShowProfilModal] = useState(false);



  
   const start = async () => {
      try {
        if (connected) {
          const response = await getUserProfile();

          if (response === "No user found") {
            setShowProfilModal(true);
          } else {
            setUserData(response);



            

            
          }





        }
      } catch (error) {
        console.log(error);
      }
    };



  useEffect(() => {
   
    start();
  }, [connected, wallet]);

  return (
    <userContext.Provider
      value={{ showProfileModal, userData, setShowProfilModal,start }}
    >
      {children}
    </userContext.Provider>
  );
};
