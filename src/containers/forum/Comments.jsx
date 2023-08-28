import Comment from "../../components/forum/Comment";
import PropTypes from "prop-types";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
