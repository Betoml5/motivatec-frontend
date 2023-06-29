import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../screens/loading/Spinner";

function ProtectedRoute({ element: Element, allowedRoles, fallbackPath }) {
  const { user } = useAuth();
  const role = user?.user?.userType?.type.toLowerCase();

  if (!user) {
    return <Spinner />;
  }

  if (!allowedRoles.includes(role)) {
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
