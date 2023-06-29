import { createContext, useEffect, useState } from "react";
import { signinAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../services/accessToken";
import { AuthClient } from "../services/axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signin = async (email, password) => {
    try {
      const response = await signinAPI(email, password);
      const userType =
        response.body.payload.entity.user.userType.type.toLowerCase();
      setRole(userType);
      setAccessToken(response.body.token);
      setUser(response.body.payload.entity);
      setIsAuth(true);
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

  const signout = () => {
    setRole("");
    navigate("/");
    setUser(null);
  };

  const getCurrentUser = async () => {
    try {
      const response = await AuthClient.post("/user/auth/current");
      console.log("RESPONSE FROM AUTH CONTEXT", response.data);
      if (response.status !== 200) {
        throw new Error("Not authorized");
      }
    } catch (error) {
      signout();
    }
  };

  const getToken = async () => {
    try {
      const response = await AuthClient.post("/auth/refresh-token");
      console.log(response.data);
      if (response.status !== 200) {
        throw new Error("Not authorized");
      }
      setAccessToken(response.data.body.token);
      const currentUser = await AuthClient.post("/user/auth/current");
      console.log("CURRENT USER", currentUser.data);
    } catch (error) {
      signout();
    }
  };

  useEffect(() => {
    getToken();
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signin,
        setIsAuth,
        role,
        signout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
