import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";
import Spinner from "../loading/Spinner";
import Post from "../../components/forum/Post";

const Posts = () => {
  const { data, isLoading, error } = useQuery("posts", getPostsAPI);

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className=" max-w-6xl mx-auto p-4">
      {data && data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
