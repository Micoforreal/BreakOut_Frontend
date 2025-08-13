import React, { useLayoutEffect } from "react";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useHoneyComb } from "../honeyComb/useHoneyComb";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfileModal from "../components/ProfileModal";

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { getUserProfile, addAchievement ,createCharacter } = useHoneyComb();
  const { connected, publicKey, wallet } = useWallet();

  const [showProfileModal, setShowProfilModal] = useState(false);

  useEffect(() => {
    const start = async () => {
      try {
        if (connected) {
          const response = await getUserProfile();

          if (response === "No user found") {
            setShowProfilModal(true);
          } else {
            setUserData(response);
            // const res = await addAchievement(response[0].userAddress, 10);

          //  const res = await createCharacter()
          //   console.log(res);
            // console.log(response);

            
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    start();
  }, [connected]);

  return (
    <userContext.Provider
      value={{ showProfileModal, userData, setShowProfilModal }}
    >
      {children}
    </userContext.Provider>
  );
};
