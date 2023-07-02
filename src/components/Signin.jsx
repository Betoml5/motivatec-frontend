import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import { getConfigAPI } from "../services/config";

const Signin = () => {
  const { signin } = useAuth();
  const { data: config, error, isLoading } = useQuery("config", getConfigAPI);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(config);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-md mt-10 p-4">
      {/* <h1>{config[0].schoolName}</h1> */}
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
