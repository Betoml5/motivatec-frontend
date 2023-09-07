import { UserClient } from "./axios";

export const getStatisticByGroupAPI = async ({ group = "" }) => {
  try {
    const response = await UserClient.get(`statistics/strategy?group=${group}`);
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
