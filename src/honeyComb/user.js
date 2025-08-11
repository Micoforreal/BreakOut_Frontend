import { client } from "../utils/constants";
import { signAndSendTransaction } from "../utils/transaction";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const createAccount = async ({ fullName }) => {
  const {
    createNewUserWithProfileTransaction: txResponse, // This is the transaction response, you'll need to sign and send this transaction
  } = await client.createNewUserWithProfileTransaction({
    project: projectAddress.toString(),
    wallet: userPublicKey.toString(),
    payer: adminPublicKey.toString(),
    profileIdentity: "main",
    userInfo: {
      name: fullName,
      bio: "",
      pfp: "",
    },
  });

  signAndSendTransaction(txResponse)
    .then((txid) => {
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
    })
    .catch((error) => {
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
    });
};
