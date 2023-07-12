import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";
import Spinner from "../loading/Spinner";
import { Link } from "react-router-dom";

const Posts = () => {
  const { data: posts, error, isLoading } = useQuery("posts", getPostsAPI);
  console.log(posts);
  if (isLoading) return <Spinner />;
  return (
    <section className="flex flex-col p-4">
      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                  <td className="py-4 px-6">{post.id}</td>
                  <td className="py-4 px-6">{post.title}</td>
                  <td className="py-4 px-6 truncate">
                    {post.entity.name} {post.entity.lastName}
                  </td>

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

export default Posts;
