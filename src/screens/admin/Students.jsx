import {
  createStudentAPI,
  deleteManyStudentsAPI,
  deleteStudentAPI,
  getStudentsAPI,
} from "../../services/student";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "../loading/Spinner";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/shared/Modal";
import { useForm } from "react-hook-form";
import { getGroupsAPI } from "../../services/group";

const Students = () => {
  const {
    data: students,
    error,
    isLoading,
    refetch,
  } = useQuery("students", getStudentsAPI);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [show, setShow] = useState(false);

  const { mutate: deleteStudent } = useMutation(
    "deleteStudent",
    (id) => deleteStudentAPI(id),
    {
      onMutate: () => {
        toast.info("Eliminando estudiante");
      },
      onSuccess: () => {
        toast.success("Estudiante eliminado");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar estudiante");
      },
    }
  );

  const { mutate: deleteStudents } = useMutation(
    "deleteStudents",
    (ids) => deleteManyStudentsAPI(ids),
    {
      onMutate: () => {
        toast.info("Eliminando estudiantes");
      },
      onSuccess: () => {
        toast.success("Estudiantes eliminados");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar estudiantes");
      },
    }
  );

  const onDeleteStudent = (id) => {
    deleteStudent(id);
  };
  const onDeleteStudents = () => {
    if (window.confirm("¿Estás seguro de eliminar estos estudiantes?")) {
      deleteStudents(selectedStudents);
    }
  };
  const onChange = (id) => {
    const index = selectedStudents.indexOf(id);
    if (index === -1) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(selectedStudents.filter((student) => student !== id));
    }
  };
  const { data: groups } = useQuery("groups", getGroupsAPI);
  const { isLoading: studentIsLoading, mutate } = useMutation(
    "registerStudent",
    (student) => createStudentAPI(student),
    {
      onMutate: () => toast.info("Guardando cambios"),
      onSettled: (data, error) => {
        if (error) {
          toast.error("Error al guardar los cambios");
        }
        if (data) {
          toast.success("Cambios guardados");
          reset();
        }
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

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al obtener los alumnos</div>;

  return (
    <section className="flex flex-col p-4">
      <Modal setShow={setShow} show={show}>
        <div className="bg-white mt-4 w-1/3  mx-auto p-4 rounded-md">
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
              required
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
                required
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
      </Modal>
      <div className="flex items-center justify-end   ">
        <button className="btn mr-2 text-center" onClick={() => setShow(true)}>
          Agregar
        </button>

        <button
          onClick={onDeleteStudents}
          disabled={selectedStudents.length === 0}
          className=" w-36 bg-red-500 py-2 px-2 text-white rounded-md disabled:opacity-50"
        >
          Eliminar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Seleccionar
              </th>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Nombre
              </th>
              <th scope="col" className="py-3 px-6">
                Apellidos
              </th>
              <th scope="col" className="py-3 px-6">
                Grupo
              </th>
              <th scope="col" className="py-3 px-6">
                Editar
              </th>
              <th scope="col" className="py-3 px-6">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td>Error al cargar los estudiantes</td>
              </tr>
            ) : (
              students?.map((student) => (
                <tr
                  key={student.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      onChange={() => onChange(student.id)}
                    />
                  </td>

                  <td className="py-4 px-6">{student.id}</td>
                  <td className="py-4 px-6">{student.name}</td>
                  <td className="py-4 px-6">{student.lastName}</td>
                  <td className="py-4 px-6">{student.group.name}</td>
                  <td className="py-4 px-6">
                    <Link
                      className="hover:underline"
                      to={`/admin/students/edit/${student.id}`}
                    >
                      Editar
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onDeleteStudent(student.id)}
                      className="hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Students;
