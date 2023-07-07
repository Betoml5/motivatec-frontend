import { useMutation, useQuery } from "react-query";
import { getGroupsAPI } from "../../../services/group";
import { createStudentAPI } from "../../../services/student";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { data: groups, error, isLoading } = useQuery("groups", getGroupsAPI);
  const { isLoading: studentIsLoading, mutate } = useMutation(
    "registerStudent",
    (student) => createStudentAPI(student),
    {
      onError: () => toast.error("Error al registrar estudiante"),
      onMutate: () => toast.info("Registrando estudiante"),
      onSettled: (data, error) => {
        if (error) {
          toast.error("Error al registrar estudiante");
        }
      },
      onSuccess: () => {
        toast.done("Estudiante registrado");
        reset();
      },
    }
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (student) => {
    mutate(student);
  };

  return (
    <div className="bg-white mt-4 max-w-2xl mx-auto p-4 rounded-md">
      <form
        id="form__student"
        className="form__student"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label" htmlFor="name">
          Nombre
        </label>
        <input
          className="input"
          id="name"
          type="text"
          placeholder="Nombre"
          name="name"
          {...register("name", { required: true })}
        ></input>
        {errors.name && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}
        <label className="label" htmlFor="lastName">
          Apellidos
        </label>
        <input
          className="input"
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Apellidos"
          {...register("lastName", { required: true })}
        ></input>
        {errors.lastName && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}

        <label className="label" htmlFor="controlNumber">
          Numero de control
        </label>
        <input
          className="input"
          id="controlNumber"
          type="text"
          name="controlNumber"
          placeholder="Numero de control"
          {...register("controlNumber", { required: true })}
        ></input>
        {errors.controlNumber && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}
        <label className="label" htmlFor="group">
          Grupo
        </label>

        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error al cargar los grupos</p>
        ) : (
          <select
            className="input"
            id="groupId"
            type="text"
            name="groupId"
            placeholder="Grupo"
            {...register("groupId", { required: true })}
          >
            <option value="" disabled selected>
              Selecciona un grupo
            </option>
            {groups?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
        {errors.groupId && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}

        <button className="btn" type="submit">
          {studentIsLoading ? "Cargando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default Register;
