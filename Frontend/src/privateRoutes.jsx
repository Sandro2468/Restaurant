import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const auth = localStorage.getItem("access_token");
  if (!auth || auth === "undefined") {
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoutes;
