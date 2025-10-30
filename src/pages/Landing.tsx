import { Link } from "react-router-dom";
import { Button, Footer, Navbar } from "../components";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] text-white relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#a00000]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10 ">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Poner algun texto
              <span className="block text-white/90 animate-pulse">
                Algo de texto mas
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Poner mas texto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button variant="secondary" className="px-8 py-4 text-lg group">
                  Iniciar Sesion
                </Button>
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover: translate-x-1 transition-transform" />
              </Link>
              <a href="#features">
                <button
                  className="px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#a00000]
                                 transition-all duration-300 transform hover:scale-105"
                >
                  Aprende más
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-4">
              Univalle <span className="text-[#a00000]">Por que?</span>
            </h2>
            <p className="text-xl text-[#767676]/80 max-w-2xl mx-auto">
              Poner texto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Caracteristicas
              </h3>
              <p className="text-[#767676]/70">Descripcion</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Caracteristicas
              </h3>
              <p className="text-[#767676]/70">Descripcion</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Caracteristicas
              </h3>
              <p className="text-[#767676]/70">Descripcion</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Caracteristicas
              </h3>
              <p className="text-[#767676]/70">Descripcion</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-6">
                Sobre <span className="text-[#a00000]">Nosotros</span>
              </h2>
              <p className="text-lg text-[#767676]/80 mb-6">
                Formamos profesionales globales e innovadores, destinados a
                liderar procesos de cambio que generan bienestar social.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80">Caracteristicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80">Caracteristicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80">Caracteristicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80">Caracteristicas</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full animate-float"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a00000]/40 rounded-full animate-float animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/30 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-6">
            Iniciar <span className="text-[#a00000]">Sesion?</span>
          </h2>
          <p className="text-xl text-[#767676]/80 mb-8">
            Descripcion de algo?
          </p>
          <Link to="/login">
            <Button variant="primary" className="px-12 py-4 text-lg group">
              Iniciar Sesion
              <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Landing;
