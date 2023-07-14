import PropTypes from "prop-types";
import { AiOutlineClockCircle } from "react-icons/ai";
import { PiStudentThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { calculateTimeSinceCreation } from "../../utils/dates";

const Post = ({ post }) => {
  return (
    <div className="post hover:shadow" key={post.id}>
      <div className="post__content ">
        <Link className="hover:underline" to={`/forum/post/${post.id}`}>
          <h1 className="text-lg text-hardBlue font-semibold">{post.title}</h1>
        </Link>

        <div className="truncate w-full h-full">
          <p
            style={{
              maxHeight: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="truncate"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
        </div>
      </div>
      <div className="post__user-data ">
        <div className="shadow-md rounded-full p-2 mr-2">
          <PiStudentThin size={20} />
        </div>
        <div>
          <p className="text-gray-400 text-xs">
            {post.user.student.name} {post.user.student.lastName}
          </p>
        </div>
        <div className="post__user-date-time text-xs">
          <AiOutlineClockCircle className="mx-2" size={15} />
          <p>Hace {calculateTimeSinceCreation(post.date)} </p>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
