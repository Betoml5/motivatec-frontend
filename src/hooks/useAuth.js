import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { isAuth, signin, role, signout } = useContext(AuthContext);

  return { isAuth, signin, role, signout };
}

export default useAuth;
