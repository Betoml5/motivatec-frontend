import Post from "../../components/forum/Post";
import SmallSpinner from "../../components/loading/SmallSpinner";
import PropTypes from "prop-types";
const Posts = ({ posts, isLoading, isError }) => {
  if (isLoading) return <SmallSpinner />;
  if (isError) return <p>Hubo un error al cargar los posts</p>;

  return (
    <>
      <h3 className="text-xl">Ultimos posts</h3>
      <div>
        {posts?.postList?.length === 0 ? (
          <p className="mt-4">No hay posts para mostrar</p>
        ) : (
          posts?.postList?.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.object,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default Posts;
