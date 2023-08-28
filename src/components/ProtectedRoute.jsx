import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ element: Element, allowedRoles, fallbackPath }) {
  const { user, auth } = useAuth();
  const role = user?.user?.userType?.type.toLowerCase();

  if (!auth) return <Navigate to={fallbackPath} replace />;
  if (!allowedRoles.includes(role))
    return <Navigate to={fallbackPath} replace />;

  return <Element />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackPath: PropTypes.string.isRequired,
};

export default ProtectedRoute;
