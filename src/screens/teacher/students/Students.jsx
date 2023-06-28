import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getStudentsAPI } from "../../../services/student";

const Students = () => {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery("students", getStudentsAPI);

  return (
    <section className="flex flex-col p-4">
      <div className="flex  self-end">
        <Link className="btn" to="/teacher/students/register">
          Agregar estudiante
        </Link>
        <Link className="btn ml-2" to="/teacher/students/import">
          Importar estudiantes
        </Link>
      </div>
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
            <th>Editar</th>
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
                    classNameName="hover:underline"
                    href={`/teacher/students/${student.id}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Students;
