import { Button, Footer, ImageCarousel, Navbar } from "../components";
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  ChevronDown,
  Lightbulb,
  Lock,
  Users,
} from "lucide-react";
import labFoto1 from "../assets/lab-04.webp";
import Login from "./login";
import React, { useState } from "react";
import { contactService } from "../api/contactService";

const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const [contactForm, setContactForm] = useState({
    nombre: "",
    correo: "",
    tipo_problema: "",
    descripcion: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo registro mi asistencia en el laboratorio?",
      answer:
        "Tu docente generará un enlace único para cada sesión de clase. Al ingresar al enlace, selecciona el equipo donde estás trabajando y confirma tu asistencia. El registro es instantáneo y solo toma unos segundos.",
    },
    {
      id: 2,
      question: "¿Puedo cambiar de equipo después de registrar mi asistencia?",
      answer:
        "No, una vez registrada tu asistencia en un equipo específico, no puedes cambiarla. Asegúrate de seleccionar el equipo correcto al momento de registrarte.",
    },
    {
      id: 3,
      question: "¿Hasta cuándo puedo registrar mi asistencia?",
      answer:
        "Cada enlace de asistencia tiene una validez de 2 horas desde que el docente lo genera. Después de ese tiempo, el enlace expira y no podrás registrar tu asistencia para esa sesión.",
    },
    {
      id: 4,
      question: "¿Cómo veo mi historial de asistencias?",
      answer:
        "En tu dashboard de estudiante encontrarás una sección con todas tus asistencias registradas, organizadas por fecha y materia. También puedes ver tu porcentaje de asistencia por cada materia.",
    },
    {
      id: 5,
      question: "¿Qué pasa si olvidé registrar mi asistencia?",
      answer:
        "Si no registraste tu asistencia durante la clase, no podrás hacerlo después ya que el enlace expira. Contacta directamente con tu docente para resolver la situación.",
    },
  ];

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await contactService.sendContactForm(contactForm);

      setSubmitMessage({
        type: "success",
        text:
          response.message ||
          "Mensaje enviando correctamente! Te responderemos pronto.",
      });

      setContactForm({
        nombre: "",
        correo: "",
        tipo_problema: "",
        descripcion: "",
      });

      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000); // desaparece después de 5 segundos
    } catch (error: any) {
      setSubmitMessage({
        type: "error",
        text:
          error.message ||
          "Hubo un error al enviar el mensaje. Intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col scroll-smooth">
      <Navbar />
      <section
        id="hero"
        className="pt-32 mt-32 pb-36 px-4 bg-gradient-to-br from-[#800000] via-[#767676] to-[#a00000] text-white relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#a00000]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-16 xl:gap-20 items-center">
            <div className="text-center ">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-12 animate-fade-in">
                Control de Laboratorios
                <span className="block text-[#a00000]/70 animate-pulse">
                  Digital
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto lg:mx-0 font-semibold">
                Inicia sesión y gestiona tus prácticas en los laboratorios de
                forma rápida y sencilla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                {/* <Link to="/login">
                  <Button
                    variant="secondary"
                    className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl group"
                  >
                    Iniciar Sesion
                  </Button>
                  <ArrowRight className="hidden sm:inline-block ml-2 w-10 h-10 group-hover:translate-x-1 transition-transform" />
                </Link> */}
                {/* <Button
                  variant="secondary"
                  className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl group"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Iniciar Sesión
                  <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button> */}
                <a href="#faq">
                  <Button
                    variant="secondary"
                    className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl group"
                  >
                    Aprende más
                  </Button>
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
              <div className="w-16 h-16 bg-[#a00000] rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
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
              <div className="w-16 h-16 bg-[#a00000] rounded-xl flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 bg-[#a00000] rounded-xl flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 bg-[#a00000] rounded-xl flex items-center justify-center mb-6">
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
              <h2 className="text-5xl md:text-6xl font-bold text-[#767676] mb-6">
                Acerca de nuestros{" "}
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

      {/* <section id="faq" className="pt-50 md:pt-50 pb-10 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#767676] mb-4">
              Preguntas <span className="text-[#a00000]">Frecuentes</span>
            </h2>
            <p className="text-xl text-[#767676]/80">
              Encuentra respuestas a las preguntas más comunes sobre nuestro
              sistema
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold text-[#767676] text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-[#a00000] flex-shrink-0 ml-4 transition-transform duration-300 ${
                      openFAQ === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {openFAQ === index && (
                  <div className="border-t border-gray-200 px-8 py-6 bg-gradient-to-br from-gray-50 to-white animate-slide-up">
                    <p className="text-lg text-[#767676]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section id="faq" className="pt-50 md:pt-50 pb-10 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <div>
              <div className="text-center lg:text-left mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-4">
                  ¿Dónde <span className="text-[#a00000]">Encontrarnos?</span>
                </h2>
                <p className="text-lg text-[#767676]/80">
                  Visítanos en nuestras instalaciones
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 ">
                <div className="relative w-full h-[400px] bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15301.786927978079!2d-68.13910811284177!3d-16.503529499999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f206782937445%3A0xacceb97486edb698!2sUniversidad%20Privada%20del%20Valle%20Sede%20La%20Paz!5e0!3m2!1ses!2sbo!4v1764464413076!5m2!1ses!2sbo"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de la Universidad"
                    className="absolute inset-0"
                  ></iframe>
                </div>

                <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-[#a00000] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#767676] text-sm">
                          Dirección
                        </h4>
                        <p className="text-[#767676]/80 text-sm">
                          Av. Argentina 2083, La Paz
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-[#a00000] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#767676] text-sm">
                          Teléfono
                        </h4>
                        <p className="text-[#767676]/80 text-sm">22001800</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-[#a00000] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#767676] text-sm">
                          Horario
                        </h4>
                        <p className="text-[#767676]/80 text-sm">
                          Lunes a Viernes: 8:00 - 12:00 / 15:00 - 19:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-4">
                  Preguntas <span className="text-[#a00000]">Frecuentes</span>
                </h2>
                <p className="text-lg text-[#767676]/80">
                  Encuentra respuestas a las preguntas más comunes sobre nuestro
                  sistema
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                      }
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                    >
                      <h3 className="text-md font-bold text-[#767676] text-left">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-[#a00000] flex-shrink-0 ml-4 transition-transform duration-300 ${
                          openFAQ === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openFAQ === index && (
                      <div className="border-t border-gray-200 px-6 py-5 bg-gradient-to-br from-gray-50 to-white animate-slide-up">
                        <p className="text-base text-[#767676]/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-50 md:pt-55 pb-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-5xl font-bold text-[#767676] mb-2">
                ¿Tienes algún <span className="text-[#a00000]">problema?</span>
              </h3>
              <p className="text-[#767676]/70 mb-6 text-lg">
                Envíanos tu consulta y te responderemos a la brevedad
              </p>

              <form className="space-y-4" onSubmit={handleContactSubmit}>
                {submitMessage && (
                  <div
                    className={`p-4 rounded-xl animate-pulse ${
                      submitMessage.type === "success"
                        ? "bg-[#a00000] text-white border-2 border-[#a00000]"
                        : "bg-[#a00000] text-white border-2 border-[#a00000]"
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-[#767676] mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={contactForm.nombre}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#a00000] focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#767676] mb-2">
                    Correo institucional
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={contactForm.correo}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#a00000] focus:outline-none transition-colors"
                    placeholder="tucorreo@univalle.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#767676] mb-2">
                    Tipo de problema
                  </label>
                  <select
                    name="tipo_problema"
                    value={contactForm.tipo_problema}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#a00000] focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="login">No puedo iniciar sesión</option>
                    <option value="cuenta">
                      Problema con cuenta institucional
                    </option>
                    <option value="asistencia">
                      Error al registrar asistencia
                    </option>
                    <option value="equipo">
                      Problema con equipo de laboratorio
                    </option>
                    <option value="otro">Otro problema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#767676] mb-2">
                    Describe tu problema
                  </label>
                  <textarea
                    name="descripcion"
                    value={contactForm.descripcion}
                    onChange={handleContactChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#a00000] focus:outline-none transition-colors resize-none"
                    placeholder="Por favor, describe detalladamente el problema que estás experimentando..."
                  ></textarea>
                </div>

                <Button
                  variant="primary"
                  className="w-full py-3 text-base group"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                  {!isSubmitting && (
                    <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="pt-12 md:pt-12 pb-6 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center lg:text-center flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#767676] mb-5">
              Iniciar <span className="text-[#a00000]">Sesión</span>
            </h2>
            <p className="text-lg text-[#767676]/80 mb-8">
              Accede al sistema para registrar tu asistencia y gestionar tus
              prácticas en los laboratorios de cómputo.
            </p>
            <div>
              <Button
                variant="primary"
                className="px-12 py-4 text-lg group"
                onClick={() => setIsLoginOpen(true)}
              >
                Iniciar Sesión
                <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Login
        isModal={true}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <Footer variant="full" />
    </div>
  );
};
export default Landing;
