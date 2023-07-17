import { UserClient } from "./axios";

export const getDailySurveysAPI = async () => {
  const response = await UserClient.get("/daily-survey");
  return response.data.body;
};

export const getDailySurveyAPI = async (id) => {
  const response = await UserClient.get(`/daily-survey/${id}`);
  return response.data.body;
};

export const createDailySurveyAPI = async (dailySurvey) => {
  const response = await UserClient.post("/daily-survey", {
    survey: dailySurvey,
  });
  return response.data.body;
};

export const updateDailySurveyAPI = async (id, dailySurvey) => {
  const response = await UserClient.put(`/daily-survey/${id}`, dailySurvey);
  return response.data.body;
};

export const deleteDailySurveyAPI = async (id) => {
  const response = await UserClient.delete(`/daily-survey/${id}`);
  return response.data.body;
};

export const checkIsSurveyDoneAPI = async () => {
  const response = await UserClient.get("/daily-survey/survey/check");
  return response.data.body;
};
