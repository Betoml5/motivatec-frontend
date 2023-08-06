import { UserClient } from "./axios";

export const getCommentsAPI = async () => {
  const response = await UserClient.get("/comment");
  return response.data.body;
};

export const getCommentAPI = async (id) => {
  const response = await UserClient.get(`/comment/${id}`);
  return response.data.body;
};

export const createCommentAPI = async (comment) => {
  const response = await UserClient.post("/comment", {
    comment: comment,
  });
  return response.data.body;
};

export const updateCommentAPI = async (id, comment) => {
  const response = await UserClient.put(`/comment/${id}`, comment);
  return response.data.body;
};

export const deleteCommentAPI = async (id) => {
  const response = await UserClient.delete(`/comment/${id}`);
  return response.data.body;
};

export const getCommentsByPostAPI = async (id) => {
  const response = await UserClient.get(`/comment/post/${id}`);
  return response.data.body;
};

export const getCommentsByUserAPI = async (id) => {
  const response = await UserClient.get(`/comment/user/${id}`);
  return response.data.body;
};
