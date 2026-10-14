import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/store/auth/slice";
import { getUserId } from "@/utils/auth";

function NavButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `text-gray-600 hover:text-pink-600 hover:border-b-2 hover:border-pink-600 transition-all py-5 ${className} ${
          isActive ? "border-b-2 border-pink-600 text-pink-600" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <Button
      variant="outline"
      className="text-pink-600 border-pink-600 hover:bg-pink-50 w-full lg:w-auto"
      onClick={logout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Cerrar Sesión
    </Button>
  );
}

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm z-50 w-full">
      <div className="flex justify-between items-center h-16">
        <div className="">
          <Link to="/my-raffles">
            <img
              src={Logo}
              className="h-20 w-32"
              alt="Logo - Cogeme un número"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-evenly w-1/4">
          <NavButton href="/my-raffles">Mis rifas</NavButton>
          <NavButton href={`/profile/${getUserId()}`}>Perfil</NavButton>

          <LogoutButton />
        </div>

        <div className="lg:hidden flex">
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>

            <DropdownMenu className="w-56">
              <DropdownMenuItem onAction={() => navigate("/my-raffles")}>
                Mis rifas
              </DropdownMenuItem>

              <DropdownMenuItem
                onAction={() => navigate(`/profile/${getUserId()}`)}
              >
                Perfil
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-pink-600"
                onAction={logout}
                textValue="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
