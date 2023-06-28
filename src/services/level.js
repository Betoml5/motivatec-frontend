import { UserClient } from "./axios/index.js";

export const getLevelsAPI = async () => {
  try {
    const response = await UserClient.get("/level");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
