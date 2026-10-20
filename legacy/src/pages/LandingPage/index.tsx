import { Button } from "@/components/ui/button";
import { Users, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-400 via-purple-500 to-purple-700 flex flex-col justify-center items-center p-4 space-y-16">
      <h1 className="text-white text-4xl md:text-6xl font-bold">
        Cógeme un número
      </h1>

      <p className="text-white/90 text-xl md:text-2xl text-center">
        Crea y participa en rifas con tus amigos, una herramienta fácil de usar.
        ¡Anímate!
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col justify-center items-center w-80 lg:w-96  bg-white/10 rounded-2xl p-6 space-y-4">
          <div className="bg-orange-500 w-12 h-12 flex justify-center items-center rounded-xl">
            <Ticket color="white" />
          </div>

          <h2 className="text-white text-center text-xl font-semibold">
            Crea rifas
          </h2>

          <p className="text-white/80 text-center text-sm">
            Organiza rifas de manera sencilla y compártelas con tus amigos en
            segundos
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-80 lg:w-96 bg-white/10 rounded-2xl p-6 space-y-4">
          <div className="bg-purple-700 w-12 h-12 flex justify-center items-center rounded-xl">
            <Users color="white" />
          </div>

          <h2 className="text-white text-center text-xl font-semibold">
            Participa
          </h2>

          <p className="text-white/80 text-center text-sm">
            Únete a rifas existentes y aumenta tus posibilidades de ganar
          </p>
        </div>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row justify-center items-center w-full">
        <Link to="/login">
          <Button className="bg-white text-purple-700 hover:bg-purple-50 font-medium rounded-md p-2 w-40">
            Ingresar
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="bg-purple-500 text-white hover:bg-purple-700 font-medium rounded-md p-2 w-40">
            Crear cuenta
          </Button>
        </Link>
      </div>

      <footer>
        <p className="text-white/80 text-sm text-center">
          © {getCurrentYear()} Bollosoft. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
