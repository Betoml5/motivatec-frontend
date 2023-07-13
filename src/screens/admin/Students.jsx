import PropTypes from "prop-types";
import { deleteStudentAPI, getStudentsAPI } from "../../services/student";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "../loading/Spinner";

const Students = () => {
  const {
    data: students,
    error,
    isLoading,
  } = useQuery("students", getStudentsAPI);

  const { mutate } = useMutation("deleteStudent", (id) => deleteStudentAPI(id));

  const handleDelete = (id) => {
    mutate(id);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al obtener los alumnos</div>;

  return (
    <section className="flex flex-col p-4">
      <div className="flex flex-col md:flex-row  md:self-end">
        <Link className="btn text-center" to="/teacher/students/register">
          Agregar estudiante
        </Link>
        <Link className="btn text-center md:ml-2" to="/teacher/students/import">
          Importar estudiantes
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                      onClick={() => handleDelete(student.id)}
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

Students.propTypes = {
  students: PropTypes.array.isRequired,
};

export default Students;
