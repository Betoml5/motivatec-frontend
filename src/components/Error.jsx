import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
