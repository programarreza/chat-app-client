import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (user && !loading) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoutes;


