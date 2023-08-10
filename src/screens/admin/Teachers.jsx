import { useMutation, useQuery } from "react-query";
import {
  deleteManyTeachersAPI,
  deleteTeacherAPI,
  getTeachersAPI,
} from "../../services/teacher";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import TeachersTable from "../../containers/teacher/TeachersTable";
const Teachers = () => {
  const {
    data: teachers,
    isError,
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
      <div className="flex items-center justify-end ">
        <Link
          className="btn m-0 mr-2  text-center"
          to="/teacher/students/register"
        >
          Agregar maestro
        </Link>
        <button
          onClick={onDeleteTeachers}
          disabled={selectedTeachers.length === 0}
          className="self-end w-36 bg-red-500 py-2 px-2 text-white rounded-md disabled:opacity-50"
        >
          Eliminar
        </button>
      </div>

      <TeachersTable
        teachers={teachers}
        isLoading={isLoading}
        isError={isError}
        onChange={onChange}
        onDeleteTeacher={onDeleteTeacher}
      />
    </section>
  );
};

export default Teachers;
