import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { isAuth } = useContext(AuthContext);

  

  return <UserContext.Provider>{children}</UserContext.Provider>;
};
