import { createContext, useState } from "react";
import { signinAPI } from "../services/auth";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const signin = async (email, password) => {
    const response = await signinAPI(email, password);
    console.log("response", response);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signin,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
