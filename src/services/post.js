import { UserClient } from "./axios";

export const getPostsAPI = async ({ limit = 10 }) => {
  try {
    const response = await UserClient.get(`/post?limit=${limit}`);
    if (response.status !== 200) throw new Error("Error");
    return response.data.body;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPostAPI = async (id) => {
  try {
    const response = await UserClient.get(`/post/${id}`);
    if (response.status !== 200) throw new Error("Error");

    return response.data.body;
  } catch (error) {
    return {};
  }
};

export const createPostAPI = async (post) => {
  try {
    const response = await UserClient.post("/post", post);
    if (response.status !== 201) throw new Error("Error");
    return response.data.body;
  } catch (error) {
    return {};
  }
};

export const updatePostAPI = async (id, post) => {
  try {
    const response = await UserClient.put(`/post/${id}`, post);
    if (response.status !== 200) throw new Error("Error");
    return response.data.body;
  } catch (error) {
    return {};
  }
};

export const deletePostAPI = async (id) => {
  try {
    const response = await UserClient.delete(`/post/${id}`);
    if (response.status !== 200) throw new Error("Error");
    return response.data.body;
  } catch (error) {
    return {};
  }
};
