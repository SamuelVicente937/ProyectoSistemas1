import { useState } from "react";
import { Facebook, Instagram, Lock, Mail, Twitter } from "lucide-react";
import logoUnivalle from "../assets/logo-univalle.png";
import { Button, Input } from "../components";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#a00000] via-[#767676] to-[#a00000] flex items-center justify-center p-4">
      <section
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row
                transform transition-all duration-500 hover:scale-[1.01]"
      >
        <article className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <header className="mb-12">
            <img src={logoUnivalle} alt="logo-univalle" className="h-25 w-auto" />
          </header>

          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              <span className="text-[#767676]">Hola,</span>
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#a00000] animate-pulse">
              bienvenido!
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo electronico"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="est@univalle.edu"
            />
            <Input
              label="Contraseña"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#a00000] border-[#767676] rounded focus:ring-[#a00000] transition-all"
                />
                <span className="ml-2 text-[#767676] group-hover:text-[#a00000] transition-colors">
                  Recordarme
                </span>
              </label>

              <a
                href="#"
                className="text-[#767676] hover:text-[#a00000] transition-colors"
              >
                Olvido su contraseña?
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" fullWidth>
                Iniciar Sesion
              </Button>
              <Button type="submit" variant="secondary" fullWidth>
                Registrarse
              </Button>
            </div>
          </form>

          <div className="mt-12 flex items-center gap-6">
            <span className="text-sm text-[#767676] uppercase tracking-wider">
              Siguenos!
            </span>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
              >
                <Facebook className="w-5 h-5"></Facebook>
              </a>
              <a
                href="#"
                className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
              >
                <Twitter className="w-5 h-5"></Twitter>
              </a>
              <a
                href="#"
                className="text-[#767676] hover:text-[#a00000] transform hover:scale-110 transition-all"
              >
                <Instagram className="w-5 h-5"></Instagram>
              </a>
            </div>
          </div>
        </article>

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
      </section>
    </main>
  );
};

export default Login;
