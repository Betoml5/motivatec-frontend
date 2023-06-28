import jwtDecode from "jwt-decode";
import { AuthClient, UserClient } from ".";
import { getAccessToken, setAccessToken } from "../accessToken";
import dayjs from "dayjs";

export function initAxiosInterceptors() {
  UserClient.interceptors.request.use(
    async (request) => {
      request.headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (!getAccessToken()) {
        console.log("No ACCESS TOKEN");
        return request;
      }

      const user = jwtDecode(getAccessToken());
      console.log("user from jwtcode ", user);
      const isExpired = dayjs.unix(user.exp).diff(dayjs(), "second") < 1;
      if (!isExpired) return request;
      try {
        const response = await AuthClient.post("/auth/refresh-token");
        console.log("Token refreshed");
        setAccessToken(response.data.accessToken);
        request.headers.Authorization = `Bearer ${response.data.accessToken}`;
      } catch (error) {
        console.log("REJECTED");
      }

      return request;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
}
