import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, useQuery } from "react-query";
import { changePasswordAPI, getCurrentSession } from "../services/user";
import { toast } from "react-toastify";

function useUser() {
  const { user, setUser } = useContext(UserContext);
  const { data, error, isLoading } = useQuery("user", getCurrentSession);
  const { mutate: changePassword, isLoading: isPasswordLoading } = useMutation(
    changePasswordAPI,
    {
      onSuccess: () => {
        toast.success("Contraseña cambiada con éxito");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.entity);
    }
  }, [data, isLoading, setUser]);

  return {
    user,
    setUser,
    data,
    error,
    isLoading,
    changePassword,
    isPasswordLoading,
  };
}

export default useUser;
