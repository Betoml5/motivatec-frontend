import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostAPI } from "../../services/post";
import { PiStudentThin } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { calculateTimeSinceCreation } from "../../utils/dates";

const PostDetails = () => {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery("post", () => getPostAPI(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="flex flex-col justify-center w-full h-60 -z-50 bg-blog bg-cover p-4 lg:p-10">
        <h1 className=" bottom-10 left-5 text-white font-semibold text-3xl ">
          {post.title}
        </h1>
        <div className="flex items-center mt-6">
          <div className="bg-white shadow-md rounded-full w-fit p-2 mr-2">
            <PiStudentThin size={20} />
          </div>
          <p className="text-white">{post.entity.name}</p>

          <div className="post__user-date-time text-white">
            <AiOutlineClockCircle className="mx-2" size={15} />
            <p>Hace {calculateTimeSinceCreation(post.date)} </p>
          </div>
        </div>
      </div>

      <div className="text-lg max-w-4xl  mx-auto mt-6 mb-10 leading-8">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
