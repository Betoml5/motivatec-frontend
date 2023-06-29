import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";

const Posts = () => {
  const { data, isLoading, error } = useQuery("posts", getPostsAPI);
  console.log(data);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      {data &&
        data?.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Posts;
