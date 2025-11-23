import { useState } from "react";
import {
  ArrowLeft,
  Facebook,
  Instagram,
  Lock,
  Mail,
  Twitter,
  X,
} from "lucide-react";
import logoLabValle from "../assets/logo-labvalle.svg";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../api/authService";

interface LoginModalProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormData {
  correo_institucional: string;
  password: string;
}

const Login = ({
  isModal = false,
  isOpen = true,
  onClose,
}: LoginModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    correo_institucional: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // // Limpiar localStorage antes de login
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // console.log("🧹 localStorage limpiado antes de login");

    try {
      // console.log("📧 Intentando login con:", formData.correo_institucional);

      const data = await authService.login(
        formData.correo_institucional,
        formData.password
      );

      // console.log("✅ Login exitoso!", data);
      // console.log("🎫 Token RECIBIDO del backend:", data.access_token);
      // console.log(
      //   "🎫 Token GUARDADO en localStorage:",
      //   localStorage.getItem("token")
      // );

      // // Verificar que son iguales
      // if (data.access_token === localStorage.getItem("token")) {
      //   console.log("✅ TOKEN CORRECTO - Coinciden!");
      // } else {
      //   console.error("❌ ERROR - Los tokens NO coinciden!");
      //   console.error("Backend:", data.access_token);
      //   console.error("LocalStorage:", localStorage.getItem("token"));
      // }
      const redirectUrl = localStorage.getItem("redirectAfterLogin");

      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectUrl);
      } else {
        switch (data.user.tipo_usuario) {
          case "docente":
            navigate("/docente/dashboard");
            break;
          case "estudiante":
            navigate("/estudiante/dashboard");
            break;
          case "personal":
            navigate("/control/dashboard");
            break;
          default:
            navigate("/");
        }
      }
      if (isModal && onClose) {
        onClose();
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      const error = err as { message?: string };
      setError(error.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };
  const LoginContent = (
    <section
      className={`w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row
                transform transition-all duration-500 hover:scale-[1.01] relative ${
                  isModal
                    ? "max-w-[95vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
                    : "max-w-6xl"
                }
                `}
    >
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-[#a00000] transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <article
        className={`w-full flex flex-col justify-center ${
          isModal
            ? "p-6 sm:p-8 md:p-10 lg:p-12"
            : "p-10 md:w-1/2 md:p-12 lg:p-16"
        }`}
      >
        <header className="mb-2 flex items-center justify-between">
          {!isModal && (
            <div>
              <Link to="/">
                <ArrowLeft className="inline-block w-13 h-13 hover:-translate-x-1/12 transition-transform text-[#767676]" />
              </Link>
            </div>
          )}
          <img
            src={logoLabValle}
            alt="logo-labvalle"
            className={`w-40 sm:w-32 md:w-56 lg:w-64 ${
              isModal ? "mx-auto" : ""
            }`}
          />
        </header>

        <div className="mb-8 md:mb-10">
          <h2
            className={`font-bold mb-2 ${
              isModal
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                : "text-4xl md:text-5xl lg:text-6xl"
            }`}
          >
            <span className="text-[#767676]">Hola,</span>
          </h2>
          <h2
            className={`font-bold text-[#a00000] animate-pulse ${
              isModal
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                : "text-4xl md:text-5xl lg:text-6xl"
            }`}
          >
            bienvenido!
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <Input
            label="Correo electronico"
            type="email"
            name="correo_institucional"
            icon={Mail}
            value={formData.correo_institucional}
            onChange={handleChange}
            placeholder="est@univalle.edu"
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
          />
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>

        <div className="mt-12 flex items-center gap-6">
          <span className="text-sm text-[#767676] uppercase tracking-wider">
            Siguenos!
          </span>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/univallelpz/?locale=es_LA"
              target="_blank"
              className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
            >
              <Facebook className="w-5 h-5"></Facebook>
            </a>
            <a
              href="https://x.com/univallelapaz?lang=es"
              target="_blank"
              className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
            >
              <Twitter className="w-5 h-5"></Twitter>
            </a>
            <a
              href="https://www.instagram.com/univalle_lapaz/"
              target="_blank"
              className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
            >
              <Instagram className="w-5 h-5"></Instagram>
            </a>
          </div>
        </div>
      </article>

      {!isModal && (
        <aside className="w-full md:w-1/2 bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] relative overflow-hidden min-h-[300px] md:min-h-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#a00000]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full transform rotate-45 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a00000]/40 rounded-full animate-float animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/30 rounded-full animate-spin-slow"></div>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
  if (isModal) {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>{LoginContent}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] flex items-center justify-center p-4">
      {LoginContent}
    </main>
  );
};

export default Login;
