import { createContext, useState } from "react";
import { signinAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(""); // ["admin", "teacher", "student"

  const navigate = useNavigate();

  const signin = async (email, password) => {
    try {
      const response = await signinAPI(email, password);
      const userType =
        response.body.payload.entity.user.userType.type.toLowerCase();
      setRole(userType);

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

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signin,
        setIsAuth,
        role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
