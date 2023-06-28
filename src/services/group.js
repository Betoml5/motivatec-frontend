import { UserClient } from "./axios/index.js";

export const getGroupsAPI = async () => {
  try {
    const response = await UserClient.get("/group");
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGroupAPI = async (id) => {
  try {
    const response = await UserClient.get(`/group/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createGroupAPI = async (groupData) => {
  try {
    const response = await UserClient.post("/group", groupData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateGroupAPI = async (id, groupData) => {
  try {
    const response = await UserClient.put(`/group/${id}`, groupData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGroupAPI = async (id) => {
  try {
    const response = await UserClient.delete(`/group/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
