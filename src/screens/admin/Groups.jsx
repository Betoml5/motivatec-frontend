import { useMutation, useQuery } from "react-query";
import {
  getGroupsAPI,
  deleteManyGroupsAPI,
  deleteGroupAPI,
  createGroupAPI,
} from "../../services/group";
import Spinner from "../loading/Spinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/shared/Modal";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Groups = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const {
    data: groups,
    isLoading,
    error,
    refetch,
  } = useQuery("groups", getGroupsAPI);

  const { mutate: deleteGroups } = useMutation(
    "deleteGroups",
    (ids) => deleteManyGroupsAPI(ids),
    {
      onMutate: () => {
        toast.info("Eliminando grupos");
      },
      onSuccess: () => {
        toast.success("Grupos eliminados");
        refetch();
        setSelectedGroups([]);
      },
      onError: () => {
        toast.error("Error al eliminar grupos");
      },
    }
  );

  const { mutate: deleteGroup } = useMutation(
    "deleteGroup",
    (id) => deleteGroupAPI(id),
    {
      onMutate: () => {
        toast.info("Eliminando grupo");
      },
      onSuccess: () => {
        toast.success("Grupo eliminado");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar grupo");
      },
    }
  );

  const { mutate: createGroup } = useMutation(
    "createGroup",
    (group) => createGroupAPI(group),
    {
      onMutate: () => {
        toast.info("Creando grupo");
      },
      onSuccess: () => {
        toast.success("Grupo creado");
        refetch();
        reset();
      },
      onError: () => {
        toast.error("Error al crear grupo");
      },
    }
  );

  const onChange = (id) => {
    const index = selectedGroups.indexOf(id);
    if (index === -1) {
      setSelectedGroups([...selectedGroups, id]);
    } else {
      setSelectedGroups(selectedGroups.filter((group) => group !== id));
    }
  };

  const onDeleteGroups = () => {
    if (window.confirm("¿Estás seguro de eliminar estos grupos?")) {
      deleteGroups(selectedGroups);
    }
  };

  const onDeleteGroup = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      deleteGroup(id);
    }
  };

  const onCreateGroup = (data) => {
    createGroup(data);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  return (
    <section className="flex flex-col p-4">
      <Modal show={showModal} setShow={setShowModal}>
        <div className="w-full max-w-xl ">
          <form
            onSubmit={handleSubmit(onCreateGroup)}
            className="bg-white rounded-md p-4 flex flex-col"
          >
            <label htmlFor="name">Nombre del grupo</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input"
              placeholder="Nombre del grupo"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            <button type="submit" className="btn">
              Crear
            </button>
          </form>
        </div>
      </Modal>
      <div className="self-end">
        <button
          onClick={onDeleteGroups}
          disabled={selectedGroups.length === 0}
          className=" w-36 bg-red-500 py-2 px-2 text-white rounded-md mr-2 disabled:opacity-50"
        >
          Eliminar
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="w-36 bg-blue-500 py-2 px-2 text-white rounded-md disabled:opacity-50 hover:opacity-90"
        >
          Crear
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
                <td>Error al cargar los grupos</td>
              </tr>
            ) : (
              groups?.map((group) => (
                <tr
                  key={group.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      name="deleteid"
                      onChange={() => onChange(group.id)}
                    />
                  </td>
                  <td className="py-4 px-6">{group.id}</td>
                  <td className="py-4 px-6">{group.name}</td>
                  <td className="py-4 px-6">
                    <Link className="hover:underline">Editar</Link>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onDeleteGroup(group.id)}
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

export default Groups;
