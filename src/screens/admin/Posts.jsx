import { useMutation, useQuery } from "react-query";
import { deleteManyPostsAPI, getPostsAPI } from "../../services/post";
import Spinner from "../loading/Spinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteStudentAPI } from "../../services/student";

const Posts = () => {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useQuery("posts", getPostsAPI);
  const { mutate: deletePosts } = useMutation(
    "deletePosts",
    (ids) => deleteManyPostsAPI(ids),
    {
      onSuccess: () => {
        toast.success("Posts eliminados");
        refetch();
        setSelectedPosts([]);
      },
      onError: () => {
        toast.error("Error al eliminar posts");
      },
    }
  );
  const { mutate: deleteStudent } = useMutation(
    "deleteStudent",
    (id) => deleteStudentAPI(id),
    {
      onSuccess: () => {
        toast.success("Estudiante eliminado");
        refetch();
      },
      onError: () => {
        toast.error("Error al eliminar estudiante");
      },
    }
  );
  const [selectedPosts, setSelectedPosts] = useState([]);

  const onChange = (id) => {
    const index = selectedPosts.indexOf(id);
    if (index === -1) {
      setSelectedPosts([...selectedPosts, id]);
    } else {
      setSelectedPosts(selectedPosts.filter((post) => post !== id));
    }
  };

  const onDeletePosts = () => {
    if (window.confirm("¿Estás seguro de eliminar estos posts?")) {
      deletePosts(selectedPosts);
    }
  };

  const onDeletePost = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      deleteStudent(id);
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <section className="flex flex-col p-4">
      <button
        onClick={onDeletePosts}
        disabled={selectedPosts.length === 0}
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
                Titulo
              </th>

              <th scope="col" className="py-3 px-6">
                Autor
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
                <td>Error al cargar los posts</td>
              </tr>
            ) : (
              posts?.map((post) => (
                <tr
                  key={post.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      name="deleteid"
                      onChange={() => onChange(post.id)}
                    />
                  </td>
                  <td className="py-4 px-6">{post.id}</td>
                  <td className="py-4 px-6">{post.title}</td>
                  <td className="py-4 px-6 truncate">
                    {post.user.student.name} {post.user.student.lastName}
                  </td>

                  <td className="py-4 px-6">
                    <Link className="hover:underline">Editar</Link>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onDeletePost(post.id)}
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

export default Posts;
