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
