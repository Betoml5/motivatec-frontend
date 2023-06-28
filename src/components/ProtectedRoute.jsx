import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, allowedRoles, fallbackPath }) {
  const currentUserRole = "teacher"; // TODO: get this from context
  if (!allowedRoles.includes(currentUserRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Element />;
}

export default ProtectedRoute;
