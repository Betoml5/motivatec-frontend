import { createContext, useEffect, useState } from "react";
import { signinAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../services/accessToken";
import { UserClient } from "../services/axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const signin = async (email, password) => {
    try {
      const response = await signinAPI(email, password);
      const userType =
        response.body.payload.entity.user.userType.type.toLowerCase();
      setAccessToken(response.body.token);
      setUser(response.body.payload.entity);
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          break;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await UserClient.get("/user/auth/current");
      if (response.status !== 200) {
        throw new Error("Not authorized");
      }
      setUser(response.data.body.entity);

      const userType =
        response.data.body.entity.user.userType.type.toLowerCase();
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          break;
      }
    } catch (error) {
      signout();
    }
  };

  const getToken = async () => {
    try {
      const response = await UserClient.post("/auth/refresh-token");
      if (response.status !== 200) {
        throw new Error("Not authorized");
      }
      setAccessToken(response.data.body.token);
    } catch (error) {
      signout();
    }
  };

  const signout = () => {
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    getToken();
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
