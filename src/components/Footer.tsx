import { Facebook, House, Instagram, Mail, Phone, Twitter } from "lucide-react";
import logoF4 from "../assets/3_1_.svg";
import logoUnivalle from "../assets/LOGO-UNIVALLE-03_VEC.svg";

interface FooterProps {
  variant?: "full" | "simple";
}
const Footer = ({ variant = "full" }: FooterProps) => {
  if (variant === "simple") {
    return (
      <footer>
        <footer className="bg-gradient-to-br from-[#767676] to-[#a00000] text-white py-2 text-center">
          <p className="text-white text-md flex items-center justify-center gap-2">
            &copy; Univalle - LabValle {new Date().getFullYear()}. Todos los derechos
            reservados.
            <span className="flex items-center gap-2 pb-2.5">
              <img src={logoF4} alt="logoAltF4" className="h-25 w-auto" />
            </span>
          </p>
        </footer>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-br from-[#767676] to-[#a00000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <section>
            <a href="#hero">
              <img
                src={logoUnivalle}
                alt="logoUnivalle"
                className="h-30 w-auto"
              />
            </a>
            <p className="text-white/80 text-lg pt-5 font-semibold ">
              Control de laboratorios inteligente <br />
              <span className="text-white">Univalle para toda la vida</span>
            </p>
          </section>
          <div className="mt-10 ml-15">
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2 ">
              <li>
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors text-md"
                >
                  Caracteristicas
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors text-md"
                >
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-colors text-md"
                >
                  Contactanos!
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-4">
              Informacion de Contacto
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/80 text-md">
                <Mail className="w-4 h-4"></Mail>
                <span>univallelpz@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-md">
                <Phone className="w-4 h-4"></Phone>
                <span>(591-2) 2001800 | (591-2) 2246725-6-7 </span>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-md">
                <House className="w-4 h-4"></House>
                <span>Campus Miraflores Av. Argentina Nro. 2083</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 ml-15">
            <h4 className="text-lg font-semibold mb-4">Siguenos!</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/univallelpz/?locale=es_LA"
                target="_blank"
                className="w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5"></Facebook>
              </a>
              <a
                href="https://x.com/univallelapaz?lang=es"
                target="_blank"
                className="w-13 h-13 rounded-full bg-white/10 hover:bg-[white]/20  flex items-center justify-center transition-all transform hover:scale-110  "
              >
                <Twitter className="w-5 h-5"></Twitter>
              </a>
              <a
                href="https://www.instagram.com/univalle_lapaz/"
                target="_blank"
                className="w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5"></Instagram>
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 mt-6 pt-3 text-center">
            <p className="text-white/60 text-sm flex items-center justify-center gap-2">
              &copy; Univalle - LabValle {new Date().getFullYear()}. Todos los derechos
              reservados.
              <span className="flex items-center gap-2 pb-1.5">
                <img src={logoF4} alt="logoAltF4" className="h-45 w-auto" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
