import { useMutation, useQuery } from "react-query";
import { getConfigAPI, updateConfigAPI } from "../../services/config";
import { useForm } from "react-hook-form";
import Spinner from "../../screens/loading/Spinner";
import { toast } from "react-toastify";
const Settings = () => {
  const { data: config, error, isLoading } = useQuery("config", getConfigAPI);
  const { mutate } = useMutation(
    "config",
    (changes) => updateConfigAPI(changes),
    {
      onSuccess: () => {
        toast.success("Configuración actualizada");
      },
      onError: () => {
        toast.error("Error al actualizar la configuración");
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (changes) => {
    if (!changes) return;
    mutate(changes);
  };

  if (isLoading) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="flex flex-col">
            <label htmlFor="schoolName">Nombre de la escuela</label>
            <input
              className="input"
              type="text"
              id="schoolName"
              defaultValue={config?.schoolName}
              {...register("schoolName", { required: true })}
            />
            {errors.schoolName && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="schoolEmail">Correo electronico</label>
            <input
              className="input"
              type="text"
              id="schoolEmail"
              defaultValue={config?.schoolEmail}
              {...register("schoolEmail", { required: true })}
            />
            {errors.schoolEmail && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Numero de telefono</label>
            <input
              className="input"
              type="tel"
              id="schoolPhone"
              defaultValue={config?.schoolPhone}
              {...register("schoolPhone", { required: true })}
            />
            {errors.schoolPhone && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="schoolEmailPrefix">
              Prefijo de correo electronico
            </label>
            <input
              className="input"
              type="tel"
              id="schoolEmailPrefix"
              defaultValue={config?.schoolEmailPrefix}
              {...register("schoolEmailPrefix", { required: true })}
            />
            {errors.schoolEmailPrefix && (
              <span className="text-red-500">
                Este campo es requerido, debe ser un prefijo valido
              </span>
            )}
          </div>
          <div className="flex flex-col col-span-full">
            <label htmlFor="schoolWebsite">Sitio web</label>
            <input
              className="input"
              type="text"
              id="schoolWebsite"
              defaultValue={config?.schoolWebsite}
              {...register("schoolWebsite", { required: true })}
            />
            {errors.schoolWebsite && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="flex flex-col col-span-full">
            <label htmlFor="schoolAddress"> Dirección</label>
            <input
              className="input"
              type="text"
              id="schoolAddress"
              defaultValue={config?.schoolAddress}
              {...register("schoolAddress", { required: true })}
            />
            {errors.schoolAddress && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
        </div>
        <button className="btn" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default Settings;
