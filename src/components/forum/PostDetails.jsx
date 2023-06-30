import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostAPI } from "../../services/post";

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery("post", () => getPostAPI(id));

  console.log(data);

  return <div>PostDetails</div>;
};

export default PostDetails;
