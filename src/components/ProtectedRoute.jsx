import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ element: Element, allowedRoles, fallbackPath }) {
  const { role, isAuth } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (!isAuth) {
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
