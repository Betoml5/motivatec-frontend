import { UserClient } from "./axios";

export const getTotalResultsAPI = async () => {
  try {
    const response = await UserClient.get("/result");
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response);
    }
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getResultAPI = async (id) => {
  try {
    const response = await UserClient.get(`/result/${id}`);
    if (response.status !== 200) {
      throw new Error(response);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createResultAPI = async (data) => {
  try {
    const response = await UserClient.post("/result", {
      result: data,
    });

    if (response.status !== 201 && response.status !== 200) {
      throw new Error(response);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkIsSurveyDoneAPI = async () => {
  try {
    const response = await UserClient.get("/result/survey/check");

    if (response.status !== 200) {
      throw new Error(response);
    }

    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
