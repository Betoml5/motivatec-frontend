import { useQuery } from "react-query";
import { getConfigAPI } from "../../services/config";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { data: config, error, isLoading } = useQuery("config", getConfigAPI);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div className="p-4">
      <form className="flex flex-col " action="">
        <div className="flex ">
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Nombre de la escuela</label>
            <input className="input" type="text" />
          </div>
          <div className="flex flex-col w-1/2 ml-1">
            <label htmlFor="">Nombre de la escuela</label>
            <input className="input" type="text" />
          </div>
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default Settings;
