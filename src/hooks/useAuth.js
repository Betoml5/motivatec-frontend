import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { signin, signout, user, auth, error } = useContext(AuthContext);

  return { signin, signout, user, auth, error };
}

export default useAuth;
