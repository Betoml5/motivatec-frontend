import PropTypes from "prop-types";

const Post = ({ title, content }) => {
  return <div>Post</div>;
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Post;
