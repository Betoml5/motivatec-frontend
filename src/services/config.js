import { ConfigClient, UserClient } from "./axios/index.js";

export const getConfigAPI = async () => {
  try {
    const response = await ConfigClient.get("/config");

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateConfigAPI = async (changes) => {
  try {
    const response = await UserClient.put("/config", {
      config: changes,
    });

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
