import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import SmallSpinner from "../../components/loading/SmallSpinner";

const TeachersTable = ({
  teachers,
  isLoading,
  isError,
  onDeleteTeacher,
  onChange,
}) => {
  if (isLoading) return <SmallSpinner />;
  if (isError) return <p>Ocurrio un error inesperado</p>;

  return (
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
              Editar
            </th>
            <th scope="col" className="py-3 px-6">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher) => (
            <tr
              key={teacher.id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td className="py-4 px-6">
                <input
                  type="checkbox"
                  name="deleteid"
                  onChange={() => onChange(teacher.id)}
                />
              </td>
              <td className="py-4 px-6">{teacher.id}</td>
              <td className="py-4 px-6">{teacher.name}</td>
              <td className="py-4 px-6">{teacher.lastName}</td>

              <td className="py-4 px-6">
                <Link className="hover:underline">Editar</Link>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => onDeleteTeacher(teacher.id)}
                  className="hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TeachersTable.propTypes = {
  teachers: Proptypes.array.isRequired,
  isLoading: Proptypes.bool.isRequired,
  isError: Proptypes.bool.isRequired,
  onDeleteTeacher: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
};

export default TeachersTable;
