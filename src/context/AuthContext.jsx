import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI, signoutAPI } from "../services/auth";
import { setAccessToken } from "../services/accessToken";
import { UserClient } from "../services/axios";
export const AuthContext = createContext({});

import Spinner from "../screens/loading/Spinner";

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const navigateByUserType = (userType) => {
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
        navigate("/");
        break;
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await signinAPI(email, password);
      if (!response.body) {
        if (
          response?.response.status === 403 ||
          response?.response.status === 401
        ) {
          console.log(response);
          throw new Error("Credenciales invalidas");
        }
        if (response?.response.status !== 200) {
          console.log(response);
          throw new Error("Error al iniciar sesion");
        }
      }
      const userType =
        response.body.payload.entity.user.userType.type.toLowerCase();
      setAccessToken(response.body.token);
      setUser(response.body.payload.entity);
      setAuth(true);
      navigateByUserType(userType);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const getCurrentSession = async () => {
    try {
      setLoading(true);
      const token = await UserClient.post("/auth/refresh-token");
      if (token.status !== 200) {
        throw new Error("Not authorized");
      }
      setAccessToken(token.data.body.token);
      const response = await UserClient.get("/user/auth/current");
      if (response.status !== 200) {
        throw new Error("Not authorized");
      }
      setUser(response.data.body.entity);
      setAuth(true);
      setLoading(false);

      const userType =
        response.data.body.entity.user.userType.type.toLowerCase();
      navigateByUserType(userType);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  const signout = async () => {
    setUser(null);
    setAccessToken(null);
    setAuth(false);
    navigate("/");

    await signoutAPI();
  };

  useEffect(() => {
    getCurrentSession();
    return () => {
      setUser(null);
    };
  }, []);

  if (loading) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        signin,
        signout,
        user,
        auth,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
