import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";
import Spinner from "../loading/Spinner";
import Post from "../../components/forum/Post";

const Posts = () => {
  const { data: posts, isLoading, error } = useQuery("posts", getPostsAPI);

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className=" max-w-6xl mx-auto p-4">
      {posts.length === 0 && (
        <div className="text-center text-gray-500">No hay publicaciones</div>
      )}
      {posts && posts?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
