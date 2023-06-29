import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { isAuth, signin, role, signout, user } = useContext(AuthContext);

  return { isAuth, signin, role, signout, user };
}

export default useAuth;
