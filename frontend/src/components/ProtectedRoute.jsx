import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return props.loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
