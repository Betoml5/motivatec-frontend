import axios from "axios";

export const getRandomAdviceAPI = async () => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
