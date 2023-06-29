import jwtDecode from "jwt-decode";
import { AuthClient, UserClient } from ".";
import { getAccessToken, setAccessToken } from "../accessToken";
import dayjs from "dayjs";

function initAxiosInterceptors() {
  UserClient.interceptors.request.use(
    async (request) => {
      request.headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (!getAccessToken()) {
        try {
          const response = await AuthClient.post("/auth/refresh-token");
          if (response.status !== 200) {
            return request;
          }
          setAccessToken(response.data.body.token);
          request.headers.Authorization = `Bearer ${response.data.body.token}`;
        } catch (error) {
          return request;
        }
      }

      const user = jwtDecode(getAccessToken());
      const isExpired = dayjs.unix(user.exp).diff(dayjs(), "second") < 1;
      if (!isExpired) return request;
      try {
        const response = await AuthClient.post("/auth/refresh-token");
        setAccessToken(response.data.body.token);
        request.headers.Authorization = `Bearer ${response.data.body.token}`;
      } catch (error) {
        console.log("REJECTED");
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default initAxiosInterceptors;
