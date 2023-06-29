import { UserClient } from "./axios";

export const getCommentsAPI = async () => {
  const response = await UserClient.get("/comments");
  return response.data.body;
};

export const getCommentAPI = async (id) => {
  const response = await UserClient.get(`/comments/${id}`);
  return response.data.body;
};

export const createCommentAPI = async (comment) => {
  const response = await UserClient.post("/comments", comment);
  return response.data.body;
};

export const updateCommentAPI = async (id, comment) => {
  const response = await UserClient.put(`/comments/${id}`, comment);
  return response.data.body;
};

export const deleteCommentAPI = async (id) => {
  const response = await UserClient.delete(`/comments/${id}`);
  return response.data.body;
};

export const getCommentsByPostAPI = async (id) => {
  const response = await UserClient.get(`/comments/post/${id}`);
  return response.data.body;
};

export const getCommentsByUserAPI = async (id) => {
  const response = await UserClient.get(`/comments/user/${id}`);
  return response.data.body;
};
