import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h2>Loading....</h2>;
  } else if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ form: location }} replace />;
};

export default PrivateRoutes;
