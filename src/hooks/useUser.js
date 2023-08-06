import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { getCurrentSession } from "../services/user";
function useUser() {
  const { user, setUser } = useContext(UserContext);
  const { data, error, isLoading } = useQuery("user", getCurrentSession);

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.entity);
    }
  }, [data, isLoading, setUser]);

  return { user, setUser, data, error, isLoading };
}

export default useUser;
