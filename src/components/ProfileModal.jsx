import React, { createContext, useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useHoneyComb } from "../honeyComb/useHoneyComb";
import { userContext } from "../context/userContext";
import { useWallet } from "@solana/wallet-adapter-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Enter Full Name",
  }),
});

const ProfileModal = () => {
  const { setUserData, start, showProfileModal, setShowProfilModal,setIsLoading } =
    useContext(userContext);
  const { connected, publicKey } = useWallet();

  const { createAccount, createCharacter, getUserProfile, generateUserAuth, updateLevel } =
    useHoneyComb();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      
      if (connected === true) {
        const response = await createAccount({
          fullName: data.fullName,
          user: publicKey,
        });

        if (response) {
          await createCharacter();
          
          await generateUserAuth(publicKey);
          await updateLevel(publicKey, 1)
          
        }
        start();
        setShowProfilModal(false);
      }
    } catch (error) {
      
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      {showProfileModal === true && (
        <>
          {console.log("profile modal")}

          <div className=" inset-0 absolute z-50 place-content-center bg-black/80  flex justify-center items-center h-full p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2></h2>
              <div className="grid gap-6 mb-6  max-w-[500px] ">
                <div>
                  <label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    {...register("fullName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                  />

                  {errors.fullName && (
                    <h3 className="text-red-500 ">{errors.fullName.message}</h3>
                  )}
                </div>
              </div>
              <button className="my-5 md:px-10 py-2 px-4 bg-gray-200 text-blue-950 rounded-lg ">
                Continue
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileModal;
