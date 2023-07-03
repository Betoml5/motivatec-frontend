import jwtDecode from "jwt-decode";
import { AuthClient, UserClient } from ".";
import { getAccessToken, setAccessToken } from "../accessToken";
import dayjs from "dayjs";

let isRefreshing = false;
let refreshSubscribers = [];

function onAccessTokenFetched(token) {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

function initAxiosInterceptors() {
  UserClient.interceptors.request.use(async (request) => {
    if (getAccessToken()) {
      request.headers = {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }

    if (!getAccessToken()) {
      return request;
    }

    const user = jwtDecode(getAccessToken());
    const isExpired = dayjs.unix(user.exp).diff(dayjs(), "second") < 1;

    if (!isExpired) {
      return request;
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const response = await AuthClient.post("/auth/refresh-token");
        const newToken = response.data.body.token;
        setAccessToken(newToken);
        onAccessTokenFetched(newToken);
        request.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        // Handle token refresh error, e.g., redirect to login page
        console.log("Token refresh failed:", error);
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          request.headers.Authorization = `Bearer ${token}`;
          resolve(request);
        });
      });
    }

    return request;
  });

  UserClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle request error, e.g., refresh token failed or unauthorized access
      // You can redirect to login page or handle the error based on your application's requirements
      console.log("Request error:", error);
      return Promise.reject(error);
    }
  );
}

export default initAxiosInterceptors;
