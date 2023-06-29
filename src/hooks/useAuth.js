import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const { signin, signout, user } = useContext(AuthContext);

  return { signin, signout, user };
}

export default useAuth;
