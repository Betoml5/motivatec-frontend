import { AuthClient } from "./axios";

export const signinAPI = async (email, password) => {
  try {
    const response = await AuthClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
