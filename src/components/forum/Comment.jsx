import { PiStudentThin } from "react-icons/pi";
import { calculateTimeSinceCreation } from "../../utils/dates";
import { AiOutlineClockCircle } from "react-icons/ai";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  return (
    <div
      key={comment.id}
      className=" break-words border-b  my-6 bg-white p-4 rounded-md last:border-0"
    >
      <div className="flex  ">
        <PiStudentThin size={20} />
        <p className="text-sm underline">{comment.user.entity.name}</p>
      </div>
      <p className="text-sm mt-2 ">{comment.content}</p>
      <p className="flex items-center text-sm mt-4">
        <AiOutlineClockCircle className="mr-2" size={15} />
        Hace {calculateTimeSinceCreation(comment.date)}
      </p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
