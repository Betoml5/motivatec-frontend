import { UserClient } from "./axios";

export const getCurrentSession = async () => {
  try {
    const response = await UserClient.get("/user/auth/current");
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};

export const changePasswordAPI = async (passwords) => {
  try {
    const response = await UserClient.patch("/user/change-password", passwords);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOneUser = async (id) => {
  try {
    const response = await UserClient.delete(`/user/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.body;
  } catch (error) {
    throw new Error(error);
  }
};
