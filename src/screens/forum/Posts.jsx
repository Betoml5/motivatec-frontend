import { useQuery } from "react-query";
import { getPostsAPI } from "../../services/post";
import { PiStudentThin } from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { calculateTimeSinceCreation } from "../../utils/dates";
import { Link } from "react-router-dom";

const Posts = () => {
  const { data, isLoading, error } = useQuery("posts", getPostsAPI);

  return (
    <div className="bg-[#f6f6f6] max-w-6xl mx-auto p-4">
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      {data &&
        data?.map((post) => (
          <div className="post" key={post.id}>
            <div className="post__content">
              <Link to={`/forum/post/${post.id}`}>
                <h1 className="text-lg text-hardBlue font-semibold">
                  {post.title}
                </h1>
              </Link>

              <p className=" truncate">{post.content}</p>
            </div>
            {/* <p>{calculateHoursSinceCreation(post.date)}</p> */}
            <div className="post__user-data">
              <div className="bg-white shadow-md rounded-full p-2 mr-2">
                <PiStudentThin size={20} />
              </div>
              <div>
                <p className="text-gray-400 font-semibold">
                  {post.entity.name} {post.entity.lastName}
                </p>
              </div>
              <div className="post__user-date-time">
                <AiOutlineClockCircle className="mx-2" size={15} />
                <p>Hace {calculateTimeSinceCreation(post.date)} </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
