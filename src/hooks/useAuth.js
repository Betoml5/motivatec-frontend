import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { signin, signout, user, auth } = useContext(AuthContext);

  return { signin, signout, user, auth };
}

export default useAuth;
