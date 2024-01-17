import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NonUserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (!user ) {
    return children;
  }

  return <Navigate to="/" />;
};

export default NonUserRoute;
