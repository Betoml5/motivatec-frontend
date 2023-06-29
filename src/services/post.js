import { UserClient } from "./axios";

export const getPostsAPI = async () => {
  const response = await UserClient.get("/posts");
  return response.data.body;
};

export const getPostAPI = async (id) => {
  const response = await UserClient.get(`/posts/${id}`);
  return response.data.body;
};

export const createPostAPI = async (post) => {
  const response = await UserClient.post("/posts", post);
  return response.data.body;
};

export const updatePostAPI = async (id, post) => {
  const response = await UserClient.put(`/posts/${id}`, post);
  return response.data.body;
};

export const deletePostAPI = async (id) => {
  const response = await UserClient.delete(`/posts/${id}`);
  return response.data.body;
};
