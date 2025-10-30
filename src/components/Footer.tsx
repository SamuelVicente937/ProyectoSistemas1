import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#767676] to-[#a00000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <section>
            <h3 className="text-2xl font-bold mb-4">Poner logo</h3>
            <p className="text-white/80 text-sm">
              Poner alguna frase para el sistema
            </p>
          </section>
          <nav>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Caracteristicas
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Contactanos!
                </a>
              </li>
            </ul>
          </nav>

          <address className="not-italic">
            <h4 className="text-lg font-semibold mb-4">
              Informacion de Contacto
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <Mail className="w-4 h-4"></Mail>
                <span>correo@fake.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <Phone className="w-4 h-4"></Phone>
                <span>+591 66666666</span>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4"></MapPin>
                <span>Calle Falsa 123</span>
              </li>
            </ul>
          </address>

          <section>
            <h4 className="text-lg font-semibold mb-4">Siguenos!</h4>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110">
                    <Facebook className="w-5 h-5"></Facebook>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110">
                    <Twitter className="w-5 h-5"></Twitter>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform hover:scale-110">
                    <Instagram className="w-5 h-5"></Instagram>
                </a>
            </div>
          </section>

            <div className="border-t border-white/20 mt-8 pt-8 text-center">
                <p className="text-white/60 text-sm">
                    &copy; Univalle {new Date().getFullYear()}. Todos los derechos reservados.
                </p>
            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;