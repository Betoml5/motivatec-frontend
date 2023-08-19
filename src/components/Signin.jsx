import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import { getConfigAPI } from "../services/config";
import SmallSpinner from "../components/loading/SmallSpinner";

const Signin = () => {
  const { signin, error } = useAuth();
  const { data: config, isLoading: isLoadingConfig } = useQuery(
    "config",
    getConfigAPI
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await signin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="max-w-xl  bg-white rounded-md mt-20 p-4 mx-4 md:mx-auto">
      <h1 className="text-center text-xl font-semibold my-2">
        {isLoadingConfig ? <SmallSpinner /> : config?.schoolName}
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
        <button className="btn " type="submit">
          {isLoading ? "Cargando..." : "Iniciar sesion"}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
