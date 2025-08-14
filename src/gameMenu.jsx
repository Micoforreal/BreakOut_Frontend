import React, { useState, useEffect, useRef, useContext } from "react";
import { levelData, userData as userDataFromFile } from "./helpers/data";
import xp from "./assets/xp.png";
import gold from "./assets/gold.png";

import { _APP } from "./main";


import { useWallet, } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAdmin } from "./honeyComb/useAdmin";
import ProfileModal from "./components/ProfileModal";
import { userContext } from "./context/userContext";






const GameMenu = () => {

  const [selectedLevel, setSelectedLevel] = useState(1);
  const [userLevel, setUserLevel] = useState(1);
  const [app, setApp] = useState(null);
  const gameAppRef = useRef(null);
  const {showProfileModal,setShowProfilModal , userData, start} = useContext(userContext)
  const { wallet, connected , publicKey:userPublicKey} = useWallet();
  const{ createProject}= useAdmin()
  
  
  useEffect(() => {
      // Simulate fetching from DB
      const fetchUserData = async () => {
          

          // setSelectedLevel(data[0]?.currentLevel ?? null);
        };
        
        fetchUserData();
        
        gameAppRef.current = _APP;

        console.log(userData)
        
        
    }, []);
    
    
    
   
    
    const startGame = () => {
        gameAppRef.current?.StartGame();
    };
    
    const handleLevelClick = (level) => {
        
        setSelectedLevel(level);
    };


   return (
    <>

<ProfileModal />
      {userData ? (
        
        <div className="  h-full  flex flex-col">

          <div className="w-[93%] ms-auto flex justify-d items-center">
            <div className="w-[80%]" id="userData">
              {userData.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-x-10"
                >
                  <div className="flex items-center gap-x-2">
                    <div className="border-2 border-amber-100 h-8 w-8 rounded-full"></div>
                    <span>{item.fullName}</span>
                  </div>

                  <div className="flex gap-x-5">
                    <div className="flex gap-x-2 items-center">
                      <img src={xp} alt="XP" className="w-9 h-9" /> {item.xp}
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <img src={gold} alt="Gold" className="w-9 h-9" />{" "}
                      {item.gold||0}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ margin: "20px" }}>
              <WalletMultiButton
                style={{ backgroundColor: "", borderRadius: "20px" }}
                class="md:text-lg"
              />
            </div>
          </div>

          <div className="p-4 text-white">
            {/* User Info */}
            

            {/* Level Selection */}
            <div className="flex gap-7 lg:w-[70%] m-auto justify-center flex-wrap">
              {levelData.map((item) => {
                const isUnlocked = userLevel >= item.level;
                const isSelected = selectedLevel === item.level;

                return (
                  <button
                    key={item.level}
                    value={item.level}
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && handleLevelClick(item.level)}
                    className={`border-2 rounded-lg px-7 text-[60px] font-bold font-serif transition-colors duration-200 
                                    ${
                                      isUnlocked
                                        ? "text-gray-300 hover:border-orange-400"
                                        : "text-gray-400 border-gray-500 cursor-not-allowed"
                                    }
                        ${isSelected ? "border-orange-500" : ""}
                        `}
                  >
                    {isUnlocked ? (
                      item.level
                    ) : (
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex  mt-auto   justify-between items-center">
            <button
              id=""
            
              className="ms-7 md:px-10 py-2 px-4 bg-gray-200 text-blue-950 rounded-lg "
            >
              Store
            </button>

            <h1 className="mx-auto border-">OutBreak</h1>
            <button
              id="start_game"
              onClick={startGame}
              className="ms-a me-7 md:px-7 py-2 px-4"
            >
              START GAME
            </button>
          </div>
        </div>
      ) : (
        <>
        <div className="flex-col m-auto justify-center items-center">
         <h2 className="my-10 text-lg font-bold">CONNECT WALLET TO START GAME</h2>
         
         <WalletMultiButton
                style={{ backgroundColor: "", borderRadius: "20px" }}
                class="md:text-lg"
              />
        </div>
        </>
      )}
    </>
  );
};

export default GameMenu;
