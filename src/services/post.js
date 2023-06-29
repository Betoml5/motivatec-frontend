import { UserClient } from "./axios";

export const getPostsAPI = async () => {
  const response = await UserClient.get("/post");
  return response.data.body;
};

export const getPostAPI = async (id) => {
  const response = await UserClient.get(`/post/${id}`);
  return response.data.body;
};

export const createPostAPI = async (post) => {
  const response = await UserClient.post("/post", post);
  return response.data.body;
};

export const updatePostAPI = async (id, post) => {
  const response = await UserClient.put(`/post/${id}`, post);
  return response.data.body;
};

export const deletePostAPI = async (id) => {
  const response = await UserClient.delete(`/post/${id}`);
  return response.data.body;
};
