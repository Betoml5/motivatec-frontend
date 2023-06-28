import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { isAuth, signin } = useContext(AuthContext);

  return { isAuth, signin };
}

export default useAuth;
