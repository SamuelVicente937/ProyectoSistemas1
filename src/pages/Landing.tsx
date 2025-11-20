import { Button, Footer, ImageCarousel, Navbar } from "../components";
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  Code2,
  Lock,
  Users,
} from "lucide-react";
import labFoto1 from "../assets/lab-04.webp";
import Login from "./login";
import { useState } from "react";

const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col scroll-smooth">
      <Navbar />
      <section
        id="hero"
        className="pt-44 mt-20 pb-36 px-4 bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] text-white relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#a00000]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-16 xl:gap-20 items-center">
            <div className="text-center ">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-12 animate-fade-in">
                Control de Laboratorios
                <span className="block text-[#a00000]/60 animate-pulse">
                  Digital
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto lg:mx-0 font-semibold">
                Inicia sesión y gestiona tus prácticas en los laboratorios de
                forma rápida y sencilla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* <Link to="/login">
                  <Button
                    variant="secondary"
                    className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl group"
                  >
                    Iniciar Sesion
                  </Button>
                  <ArrowRight className="hidden sm:inline-block ml-2 w-10 h-10 group-hover:translate-x-1 transition-transform" />
                </Link> */}
                <Button
                  variant="secondary"
                  className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl group"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Iniciar Sesion
                  <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a href="#features">
                  <button className="px-12 sm:px-12 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#a00000] transition-all duration-300 transform hover:scale-105">
                    Aprende más
                  </button>
                </a>
              </div>
            </div>
            <div className="hidden lg:block h-[400px] xl:h-[600px] w-full max-w-[700px] xl:min-w-[800px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="pt-50 md:pt-50 pb-22 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#767676] mb-4">
              ¿Por qué elegir{" "}
              <span className="text-[#a00000]">nuestros laboratorios?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-10">
              <p className="text-xl text-[#767676]/80 max-w-2xl mx-auto">
                <span className="text-[#a00000] font-bold">Misión: </span>
                Proporcionar a los estudiantes un entorno tecnológico moderno y
                seguro, que facilite el aprendizaje práctico, la investigación y
                el desarrollo de proyectos innovadores en el área de la
                ingeniería y la tecnología.
              </p>
              <p className="text-xl text-[#767676]/80 max-w-2xl mx-auto">
                <span className="text-[#a00000] font-bold">Visión: </span>
                Ser un referente en educación tecnológica dentro de la
                universidad, ofreciendo laboratorios de cómputo de vanguardia
                que potencien la creatividad, la colaboración y la formación
                integral de los estudiantes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Innovación tecnológica
              </h3>
              <p className="text-lg text-[#767676]/70">
                Nuestros laboratorios cuentan con hardware y software de
                vanguardia, fomentando la creatividad y el desarrollo de
                proyectos tecnológicos avanzados.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Colaboración y trabajo en equipo
              </h3>
              <p className="text-lg text-[#767676]/70">
                Promovemos el trabajo conjunto entre estudiantes y docentes,
                creando un entorno de aprendizaje colaborativo y enriquecedor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Optimización de recursos
              </h3>
              <p className="text-lg text-[#767676]/70">
                Nuestro sistema permite gestionar equipos y horarios de manera
                eficiente, asegurando un uso óptimo de los laboratorios y sus
                recursos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#a00000]">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a00000] to-[#767676] rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#767676] mb-3">
                Seguridad y control de acceso
              </h3>
              <p className="text-lg text-[#767676]/70">
                Garantizamos un entorno seguro con control de acceso, protección
                de equipos y supervisión constante de las actividades en los
                laboratorios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="pt-55 md:pt-50 pb-10 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-[#767676] mb-6">
                Sobre nuestros{" "}
                <span className="text-[#a00000]">Laboratorios</span>
              </h2>
              <p className="text-xl text-[#767676]/80 mb-6 ">
                Nuestros laboratorios de cómputo son espacios diseñados para
                potenciar el aprendizaje práctico y la innovación tecnológica.
                Están equipados con hardware de alto rendimiento y software
                especializado que permiten a los estudiantes desarrollar
                proyectos, programar, simular entornos y realizar prácticas en
                diversas áreas de la ingeniería y la tecnología.
              </p>
              <ul className="space-y-7 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80 mt-0.5">
                    Equipos de alto rendimiento
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80 mt-0.5">
                    Software especializado
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80 mt-0.5">
                    Seguridad y control de acceso
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-1" />
                  <span className="text-[#767676]/80 mt-0.5">
                    Soporte académico
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl relative overflow-hidden">
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full animate-float"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a00000]/40 rounded-full animate-float animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/30 rounded-full animate-spin-slow"></div>
                  </div>
                </div> */}
                <img
                  src={labFoto1}
                  alt="imagenLaboratorio"
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-45 md:pt-45 pb-15 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#767676] mb-6 ">
            Iniciar <span className="text-[#a00000]">Sesion</span>
          </h2>
          <p className="text-xl text-[#767676]/80 mb-6">
            {" "}
            Accede al sistema para registrar tu asistencia y gestionar tus
            prácticas en los laboratorios de cómputo.
          </p>
          {/* <Link to="/login">
            <Button variant="primary" className="px-12 py-4 text-lg group">
              Iniciar Sesion
              <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link> */}
          <Button
            variant="primary"
            className="px-12 py-4 text-lg group"
            onClick={() => setIsLoginOpen(true)}
          >
            Iniciar Sesion
            <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
      <Login
        isModal={true}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <Footer />
    </div>
  );
};
export default Landing;
