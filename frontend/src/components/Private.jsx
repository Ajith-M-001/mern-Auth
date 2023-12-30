import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default Private;
