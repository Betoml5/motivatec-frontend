import { useMutation, useQuery } from "react-query";
import {
  deleteManyTeachersAPI,
  deleteTeacherAPI,
  getTeachersAPI,
} from "../../services/teacher";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
const Teachers = () => {
  const {
    data: teachers,
    error,
    isLoading,
    refetch,
  } = useQuery("teachers", getTeachersAPI);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const { mutate: deleteTeachers } = useMutation(
    "deleteTeachers",
    (ids) => deleteManyTeachersAPI(ids),
    {
      onSuccess: () => {
        toast.success("Maestros eliminados");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar maestros");
      },
    }
  );

  const { mutate: deleteTeacher } = useMutation(
    "deleteStudent",
    (id) => deleteTeacherAPI(id),
    {
      onSuccess: () => {
        toast.success("Maestro eliminado");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar maestro");
      },
    }
  );

  const onChange = (id) => {
    const index = selectedTeachers.indexOf(id);
    if (index === -1) {
      setSelectedTeachers([...selectedTeachers, id]);
    } else {
      setSelectedTeachers(selectedTeachers.filter((teacher) => teacher !== id));
    }
  };

  const onDeleteTeachers = () => {
    if (window.confirm("¿Estás seguro de eliminar estos maestros?")) {
      deleteTeachers(selectedTeachers);
    }
  };

  const onDeleteTeacher = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este maestro?")) {
      deleteTeacher(id);
    }
  };

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
      <button
        onClick={onDeleteTeachers}
        disabled={selectedTeachers.length === 0}
        className="self-end w-36 bg-red-500 py-2 px-2 text-white rounded-md disabled:opacity-50"
      >
        Eliminar
      </button>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Teachers;
