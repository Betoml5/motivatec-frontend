import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import { getConfigAPI } from "../services/config";
import Spinner from "../screens/loading/Spinner";

const Signin = () => {
  const { signin } = useAuth();
  const { data: config, error, isLoading } = useQuery("config", getConfigAPI);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error </p>;

  return (
    <div className="max-w-xl  bg-white rounded-md mt-20 p-4 mx-4 md:mx-auto">
      <h1 className="text-center text-xl font-semibold my-2">
        {config.schoolName}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-4  ">
        <label htmlFor="email">Correo electronico</label>
        <input
          className="input"
          name="email"
          type="text"
          id="email"
          placeholder="Correo electronico"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          className="input"
          id="password"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Iniciar sesion
        </button>
      </form>
    </div>
  );
};

export default Signin;
