import { AuthClient } from "./axios";

export const signinAPI = async (email, password) => {
  try {
    const response = await AuthClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const signoutAPI = async () => {
  try {
    const response = await AuthClient.post("/auth/logout");
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
