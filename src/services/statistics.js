import { UserClient } from "./axios/index.js";

export const getResultsAPI = async ({ group = "" }) => {
  try {
    const response = await UserClient.get(`/statistics/results?group=${group}`);

    if (response.status !== 200) throw new Error("An error ocurred");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDailyAPI = async () => {
  try {
    const response = await UserClient.get("/statistics/daily");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDailyByEmotionAPI = async (emotion) => {
  try {
    const response = await UserClient.get(
      `/statistics/daily/emotion?emotion=${emotion}`
    );

    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDailyByMonthAPI = async () => {
  try {
    const response = await UserClient.get(`/statistics/daily/month`);
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
