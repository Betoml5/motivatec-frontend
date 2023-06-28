import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ element: Element, allowedRoles, fallbackPath }) {
  const currentUserRole = "student"; // TODO: get this from context
  if (!allowedRoles.includes(currentUserRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Element />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackPath: PropTypes.string.isRequired,
};

export default ProtectedRoute;
