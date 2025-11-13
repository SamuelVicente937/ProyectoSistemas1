import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { Button, Footer, Modal, Navbar, StatCard } from "../components";
import { AlertCircle, BookOpen, Link2, LogOut, Users } from "lucide-react";

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  tipo_usuario: "docente" | "estudiante" | "personal";
}

interface GeneratedLink {
  id: number;
  link: string;
  createdAt: string;
  expiresAt: string;
}

export default function DocenteDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([
    {
      id: 1,
      link: "https://univalle.edu/assist/abc123xyz",
      createdAt: "2025-11-12",
      expiresAt: "2025-11-19",
    },
    {
      id: 2,
      link: "https://univalle.edu/assist/def456uvw",
      createdAt: "2025-11-11",
      expiresAt: "2025-11-18",
    },
  ]);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData || userData.tipo_usuario !== "docente") {
      navigate("/login");
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    navigate("/login");
  };

  const handleGenerateLink = () => {
    const newLink: GeneratedLink = {
      id: generatedLinks.length + 1,
      link: `https://univalle.edu/assist/${Math.random()
        .toString(36)
        .substring(7)}`,
      createdAt: new Date().toISOString().split("T")[0],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
    setGeneratedLinks([newLink, ...generatedLinks]);
    setShowModal(false);
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-35 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#767676] to-[#a00000] rounded-2xl p-8 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center nd:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Bienvenido{" "}
                  <span className="text-white font-black">
                    {user.nombres} {user.apellidos}
                  </span>
                </h1>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium">{user.correo}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium">
                      ID: {user.codigo_usuario}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-4 bg-white text-[#a00000] rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <LogOut className="w-6 h-6" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={BookOpen}
              title="Clases"
              value={5}
              subtitle="Hoy: 3"
              variant="primary"
            />
            <StatCard
              icon={Users}
              title="Estudiantes Activos"
              value={45}
              subtitle="Presentes: 42"
              variant="secondary"
            />
            <StatCard
              icon={AlertCircle}
              title="Reportes Pendientes"
              value={2}
              subtitle="Urgentes: 1"
              variant="warning"
            />
          </div>
          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <Link2 className="w-7 h-7 text-[#a00000]" />
              <h2 className="text-3xl font-bold text-[#767676]">
                Generar Enlace de Asistencia
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[#767676]/5 to-[#a00000]/5 rounded-xl p-8 border-2 border-dashed border-[#767676] text-center">
              <p className="text-[#767676] text-lg font-medium mb-6">
                Crea un nuevo enlace único para registrar la asistencia de tus
                estudiantes
              </p>
              <Button
                variant="primary"
                className="px-8 py-3 text-lg font-bold"
                onClick={() => setShowModal(true)}
              >
                Generar Nuevo Enlace
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 bg-[#a00000] rounded-lg"></div>
              <h2 className="text-3xl font-bold text-[#767676]">
                Enlaces Generados ({generatedLinks.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#767676]">
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Enlace
                    </th>
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Creado
                    </th>
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Expira
                    </th>
                    <th className="text-center py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generatedLinks.length > 0 ? (
                    generatedLinks.map((link) => (
                      <tr
                        key={link.id}
                        className="border-b border-[#767676]/20 hover:bg-[#a00000]/5 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <code className="text-[#a00000] text-sm font-mono font-bold break-all">
                            {link.link}
                          </code>
                        </td>
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {link.createdAt}
                        </td>
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {link.expiresAt}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(link.link);
                              alert("Enlace copiado al portapapeles");
                            }}
                            className="px-4 py-2 bg-[#a00000] text-white rounded-lg text-sm font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-md"
                          >
                            Copiar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-[#767676] font-semibold"
                      >
                        No hay enlaces generados aún
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleGenerateLink}
        title="Generar Enlace"
        message="¿Deseas crear un nuevo enlace de asistencia? Este enlace será válido por 7 días."
        confirmText="Generar"
        cancelText="Cancelar"
      />

      <Footer />
    </div>
  );
}
