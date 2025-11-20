import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { Menu, X } from "lucide-react";
// import logoUnivalle from "../assets/logo-univalle.png";
import logoUnivalle2 from "../assets/logo_uni2.png";
import { Login } from "../pages";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <Link to="/" className="tracking-wide ">
              <img
                src={logoUnivalle2}
                alt="logo-univalle"
                className="h-20 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[#767676] hover:text-[#a00000] transition-colors font-medium text-xl"
              >
                Caracteristicas
              </a>
              <a
                href="#about"
                className="text-[#767676] hover:text-[#a00000] transition-colors font-medium text-xl"
              >
                Sobre Nosotros
              </a>
              <a
                href="#contact"
                className="text-[#767676] hover:text-[#a00000] transition-colors font-medium text-xl"
              >
                Contactanos!
              </a>
              <a
                href="https://enlace.univalle.edu/san/webform/PAutenticar.aspx"
                target="_blank"
                className="text-[#767676] hover:text-[#a00000] transition-colors font-medium text-xl"
              >
                S.I.U.
              </a>
              <Button
                variant="primary"
                className="px-6 py-1"
                onClick={handleOpenLogin}
              >
                Iniciar Sesion
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
