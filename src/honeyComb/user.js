import { ADMIN_PUBLIC_KEY, client, PROJECT_ADDRESS } from "../utils/constants";
import { signAndSendTransaction } from "../utils/transaction";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const createAccount = async ({ fullName, user }) => {
    try {
  const {
    createNewUserWithProfileTransaction: txResponse, // This is the transaction response, you'll need to sign and send this transaction
  } = await client.createNewUserWithProfileTransaction({
    project: PROJECT_ADDRESS,
    wallet: user.toString(),
    payer: ADMIN_PUBLIC_KEY ,
    profileIdentity: "main",
    userInfo: {
      name: fullName,
      bio: "",
      pfp: "",
    },
  });


    const response = await   signAndSendTransaction(txResponse)
   
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
      return response

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




export const getUserProfile = async (userPublicKey) => {

}