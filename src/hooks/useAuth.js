import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { isAuth, signin, role } = useContext(AuthContext);

  return { isAuth, signin, role };
}

export default useAuth;
