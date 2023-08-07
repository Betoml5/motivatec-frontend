import { UserClient } from "./axios/index.js";

export const getResultsAPI = async () => {
  try {
    const response = await UserClient.get("/statistics/results");

    if (response.status !== 200) throw new Error("An error ocurred");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
