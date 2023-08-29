import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStudentAPI, updateStudentAPI } from "../../services/student";
import { getGroupsAPI } from "../../services/group";
import { toast } from "react-toastify";
import Spinner from "../loading/Spinner";

const StudentEdit = () => {
  const { id } = useParams();
  const {
    data: groups,
    error,
    isLoading: isGroupsLoding,
  } = useQuery("groups", getGroupsAPI);
  const {
    data: studentData,
    isLoading: isLoadingStudent,
    isError: isStudentError,
  } = useQuery("student", () => getStudentAPI(id));

  const { mutate } = useMutation(
    "registerStudent",
    (student) => updateStudentAPI(id, student),
    {
      onMutate: () => toast.info("Guardando cambios"),
      onSettled: (data, error) => {
        toast.info("Guardando cambios...");
        if (error) {
          toast.error("Error al guardar los cambios");
        }
        if (data) {
          toast.success("Cambios guardados");
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (student) => {
    mutate(student);
  };

  if (isLoadingStudent) return <Spinner />;
  if (isStudentError) return <p>Error al cargar los datos del estudiante</p>;

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
          required
          defaultValue={studentData?.name}
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
          defaultValue={studentData?.lastName}
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
          defaultValue={studentData?.controlNumber}
          minLength={8}
          required
          {...register("controlNumber", { required: true, minLength: 8 })}
        ></input>
        {errors.controlNumber && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}
        <label className="label" htmlFor="group">
          Grupo
        </label>

        {isGroupsLoding ? (
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
            required
            defaultValue={studentData?.groupId}
            {...register("groupId", { required: true })}
          >
            <option
              value=""
              disabled
              selected={studentData?.groupId ? false : true}
            >
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
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default StudentEdit;
