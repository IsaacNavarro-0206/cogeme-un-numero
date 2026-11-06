import NavBar from "@/components/NavBar";
import { setNavigator } from "@/utils/navigator";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const { raffleId, userId } = useParams();
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    `/choose-number/${raffleId}/${userId}`,
  ];

  const { pathname } = useLocation();
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <div className="bg-gray-200 min-h-screen h-auto flex flex-col justify-start items-center">
      {!isPublicRoute && <NavBar />}

      <Outlet />
    </div>
  );
}

export default Layout;
