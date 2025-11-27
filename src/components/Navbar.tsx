import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { CircleUserRound, Menu, User, X } from "lucide-react";
import logoLabValle from "../assets/logo-labvalle.svg";
import { Login } from "../pages";
import { authService } from "../api/authService";

interface FooterProps {
  variant?: "full" | "simple";
}

const Navbar = ({ variant = "full" }: FooterProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    navigate("/");
  };

  if (variant === "simple") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="tracking-wide py-0">
              <img
                src={logoLabValle}
                alt="logo-univalle"
                className="max-h-35 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="bg-transparent p-2 relative z-10 transform hover:scale-105 transition-transform duration-300">
                <CircleUserRound className="w-14 h-14 text-[#a00000] mt-1" />
              </div>
              <Button
                variant="primary"
                className="px-6 py-1"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>

            <button
              className="md:hidden text-[#767676] hover:text-[#a00000] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 flex flex-col items-center">
              <div className="bg-[#a00000] backdrop-blur-xl p-1 rounded border border-[#a00000] shadow-lg inline-flex">
                <User className="w-31 h-9  text-white" />
              </div>

              <Button
                variant="primary"
                className="py-1 w-max"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>
          )}
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <nav className="max-w-[90%] mx-auto px-5 sm:px-6 lg:px-6 ">
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4 py-1 ml-16">
            <div className="flex justify-start ">
              <Link to="/" className="tracking-wide py-0 mr-2">
                <img
                  src={logoLabValle}
                  alt="logo-univalle"
                  className="max-h-40 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-6 ml-3 justify-center">
              <a
                href="#features"
                className="text-[#767676] hover:text-[#a00000] transition-colors duration-500 font-medium text-base"
              >
                Caracteristicas
              </a>
              <a
                href="#about"
                className="text-[#767676] hover:text-[#a00000] transition-colors duration-500 font-medium text-base"
              >
                Sobre Nosotros
              </a>
              <a
                href="#faq"
                className="text-[#767676] hover:text-[#a00000] transition-colors duration-500 font-medium text-base"
              >
                Preguntas 
              </a>
              <a
                href="#contact"
                className="text-[#767676] hover:text-[#a00000] transition-colors duration-500 font-medium text-base"
              >
                Contactanos!
              </a>
            </div>
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="px-6 py-1"
                onClick={handleOpenLogin}
              >
                Iniciar Sesion
              </Button>
            </div>
          </div>
          <div className="md:hidden flex items-center justify-between">
            <Link to="/" className="tracking-wide py-0">
              <img
                src={logoLabValle}
                alt="logo-univalle"
                className="max-h-40 w-auto"
              />
            </Link>

            <button
              className="text-[#767676] hover:text-[#a00000] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a
                href="#features"
                className="block text-[#767676] hover:text-[#a00000] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Caracteristicas
              </a>
              <a
                href="#about"
                className="block text-[#767676] hover:text-[#a00000] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </a>
              <a
                href="#contact"
                className="block text-[#767676] hover:text-[#a00000] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactanos!
              </a>
              <Button
                variant="primary"
                fullWidth
                className="py-1"
                onClick={handleOpenLogin}
              >
                Iniciar Sesion
              </Button>
            </div>
          )}
        </nav>
      </header>
      <Login
        isModal={true}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Navbar;
