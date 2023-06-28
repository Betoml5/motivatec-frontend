import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signin(email, password);
  };

  return (
    <div className="p-4">
      <h3 className="text-center">Iniciar sesión</h3>
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
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
