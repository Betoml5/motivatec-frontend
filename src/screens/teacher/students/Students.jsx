import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { deleteStudentAPI, getStudentsAPI } from "../../../services/student";

import { toast } from "react-toastify";
import { searchFilter } from "../../../utils/search";
import { useState } from "react";
import Spinner from "../../loading/Spinner";
import Error from "../../error/Error";

const Students = () => {
  const [query, setQuery] = useState("");
  const {
    data: students,
    isLoading,
    error,
    refetch,
  } = useQuery("students", getStudentsAPI);

  const { mutate } = useMutation(
    "deleteStudent",
    (id) => deleteStudentAPI(id),
    {
      onSuccess: () => {
        toast.done("Estudiante eliminado");
        refetch();
      },
      onError: () => toast.error("Error al eliminar estudiante"),
      onMutate: () => toast.info("Eliminando estudiante..."),
    }
  );

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este estudiante?")) {
      mutate(id);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  const filtered = searchFilter(students, query);
  return (
    <section className="flex flex-col p-4">
      <div className="flex flex-col w-full md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col mb-4 md:m-0 md:w-1/3">
          <label htmlFor="query">Buscador</label>
          <input
            onChange={onChange}
            className="input "
            type="text"
            placeholder="Numero de control, nombre, apellido o grupo"
          />
        </div>
        <div className=" self-end">
          <Link className="btn" to="/teacher/students/register">
            Agregar estudiante
          </Link>
          <Link className="btn ml-2" to="/teacher/students/import">
            Importar estudiantes
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Numero de control
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
              filtered?.map((student) => (
                <tr
                  key={student.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{student.controlNumber}</td>
                  <td className="py-4 px-6">{student.name}</td>
                  <td className="py-4 px-6">{student.lastName}</td>
                  <td className="py-4 px-6">{student.group.name}</td>
                  <td className="py-4 px-6">
                    <Link
                      className="hover:underline"
                      to={`/teacher/students/edit/${student.id}`}
                    >
                      Editar
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="hover:underline"
                      onClick={() => handleDelete(student.id)}
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
