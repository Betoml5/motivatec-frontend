import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { createStudentAPI, getStudentAPI } from "../../services/student";
import { getGroupsAPI } from "../../services/group";

const StudentEdit = () => {
  const { id } = useParams();
  const { data: groups, error, isLoading } = useQuery("groups", getGroupsAPI);
  const { data: studentData } = useQuery("student", () => getStudentAPI(id));

  const {
    data,
    error: studentError,
    isLoading: studentIsLoading,
    mutate,
  } = useMutation("registerStudent", (student) => createStudentAPI(student));
  const {
    register,
    handleSubmit,
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

        <button onClick={onSubmit} className="btn" type="submit">
          Editar
        </button>

        {studentIsLoading ? (
          <p>Cargando...</p>
        ) : studentError ? (
          <p>Error al registrar al alumno</p>
        ) : data ? (
          <p>Alumno registrado</p>
        ) : null}
      </form>
    </div>
  );
};

export default StudentEdit;
