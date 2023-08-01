import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";
import Spinner from "../loading/Spinner";
import Post from "../../components/forum/Post";
import { useEffect, useState } from "react";

const Posts = () => {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery("posts", () => getPostsAPI({ pageNumber: page }), {
    enabled: false,
  });

  // refetch if pageNumber changes

  useEffect(() => {
    refetch();
  }, [page]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className=" max-w-6xl mx-auto p-4">
      {posts?.postList?.length === 0 && (
        <div className="text-center text-gray-500">No hay publicaciones</div>
      )}
      {posts &&
        posts?.postList?.map((post) => <Post post={post} key={post.id} />)}
      <div>
        {posts?.totalPages > 1 && (
          <div className="flex justify-center items-center">
            <button
              disabled={page === 1}
              className={`btn mr-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Anterior
            </button>
            <button className="btn" onClick={() => setPage(page + 1)}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
