import { useMutation, useQuery } from "react-query";
import {
  createTeacherAPI,
  deleteManyTeachersAPI,
  deleteTeacherAPI,
  getTeachersAPI,
} from "../../services/teacher";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import SmallSpinner from "../../components/loading/SmallSpinner";
import Modal from "../../components/shared/Modal";
import { useForm } from "react-hook-form";

const TeachersTable = () => {
  const {
    data: teachers,
    isError,
    isLoading,
    refetch,
  } = useQuery("teachers", getTeachersAPI);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: addTeacher } = useMutation(
    "addTeacher",
    (data) => createTeacherAPI(data),
    {
      onSuccess: () => {
        toast.success("Maestro agregado");
        refetch();
      },
      onError: () => {
        toast.error("Error al agregar maestro");
      },
    }
  );

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

  const onAddTeacher = (data) => {
    addTeacher(data);
  };

  if (isLoading) return <SmallSpinner />;
  if (isError) return <p>Ocurrio un error inesperado</p>;

  return (
    <div>
      <Modal setShow={setShowModal} show={showModal}>
        <div className="bg-white p-4 rounded-md w-full max-w-xl ">
          <form className="flex flex-col" onSubmit={handleSubmit(onAddTeacher)}>
            <label className="label">Nombre</label>
            <input
              className="input"
              type="text"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mb-2">
                Este campo es requerido
              </span>
            )}

            <label className="label">Apellidos</label>
            <input
              className="input"
              type="text"
              name="lastName"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs mb-2">
                Este campo es requerido
              </span>
            )}
            <label className="label" htmlFor="controlNumber">
              Numero de control
            </label>
            <input
              className="input"
              type="text"
              name="controlNumber"
              {...register("controlNumber", {
                required: true,
                minLength: 4,
                maxLength: 4,
              })}
            />
            {errors.controlNumber && (
              <span className="text-red-500 text-xs mb-2">
                Este campo es requerido y debe tener 6 caracteres
              </span>
            )}
            <button type="submit" className="btn">
              <span>Guardar</span>
            </button>
          </form>
        </div>
      </Modal>
      <div className="flex items-center justify-end ">
        <button
          className="btn m-0 mr-2  text-center"
          onClick={() => setShowModal(!showModal)}
        >
          Agregar
        </button>
        <button
          onClick={onDeleteTeachers}
          disabled={selectedTeachers.length === 0}
          className="self-end w-36 bg-red-500 py-2 px-2 text-white rounded-md disabled:opacity-50"
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
    </div>
  );
};

export default TeachersTable;
