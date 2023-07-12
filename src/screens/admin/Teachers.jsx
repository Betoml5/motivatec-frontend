import { useQuery } from "react-query";
import { getTeachersAPI } from "../../services/teacher";
import { Link } from "react-router-dom";
const Teachers = () => {
  const {
    data: teachers,
    error,
    isLoading,
  } = useQuery("teachers", getTeachersAPI);
  return (
    <section className="flex flex-col p-4">
      <div className="flex flex-col md:flex-row md:self-end">
        <Link className="btn text-center" to="/teacher/students/register">
          Agregar maestro
        </Link>
        <Link className="btn text-center md:ml-2" to="/teacher/students/import">
          Importar maestros
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
              teachers?.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{teacher.name}</td>
                  <td className="py-4 px-6">{teacher.lastName}</td>

                  <td className="py-4 px-6">
                    <Link className="hover:underline">Editar</Link>
                  </td>
                  <td className="py-4 px-6">
                    <button className="hover:underline">Eliminar</button>
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

export default Teachers;
