import { client } from "../utils/constants";

const sendPlayerOnMission = async (characterAddress, missionAddress) => {
  const {
    createSendCharactersOnMissionTransaction: txResponse, // This is the transaction response, you'll need to sign and send this transaction
  } = await client.createSendCharactersOnMissionTransaction({
    data: {
      mission: missionAddress.toString(),
      characterAddresses: [characterAddress.toString()],
      authority: userPublicKey.toString(),
    },
  });

  const recallPlayerFromMission = async (
    characterAddress,
    missionAddress,
    lookupTableAddress
  ) => {
    const {
      createRecallCharactersTransaction: txResponse, // This is the transaction response, you'll need to sign and send this transaction
    } = await client.createRecallCharactersTransaction({
      data: {
        mission: missionAddress.toString(),
        characterAddresses: [characterAddress.toString()],
        authority: userPublicKey.toString(),
        payer: payerPublicKey.toString(), // Optional
      },
      lutAddresses: [lookupTableAddress],
    });
  };
};
