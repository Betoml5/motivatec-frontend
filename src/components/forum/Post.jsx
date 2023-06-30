import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.date}</p>
      <p>{post.content}</p>
      <p>{post.entity.name}</p>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
