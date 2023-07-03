import { ConfigClient } from "./axios/index.js";

export const getConfigAPI = async () => {
  try {
    const response = await ConfigClient.get("/config");

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data.body;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
