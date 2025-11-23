import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import {
  Button,
  Footer,
  Modal,
  Navbar,
  StatCard,
  FormLink,
} from "../components";
import {
  BookOpen,
  GraduationCap,
  Link2,
  User,
  Users,
} from "lucide-react";
import type { FormData } from "../components/FormLink";
import { sesionService } from "../api/sesionService";
import DashboardHeader from "../components/DashboardHeader";

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  tipo_usuario: "docente" | "estudiante" | "personal";
}
interface Stats {
  clases_hoy: number;
  sesiones_activas: number;
  asistencias_hoy: number;
}

interface Sesion {
  id_sesion: number;
  materia: string;
  horario: string;
  grupo: string;
  laboratorio: string;
  total_estudiantes_registrados: number;
  enlace_token: string;
  estado_sesion: string;
  fecha_expiracion: string;
}

export default function DocenteDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stats, setStats] = useState<Stats>({
    clases_hoy: 0,
    sesiones_activas: 0,
    asistencias_hoy: 0,
  });

  const [sesionesActivas, setSesionesActivas] = useState<Sesion[]>([]);

  const [enlaceGenerado, setEnlaceGenerado] = useState<{
    token: string;
    materia: string;
    grupo: string;
    horario: string;
    dia: string;
    laboratorio: string;
    fecha_expiracion: string;
  } | null>(null);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData || userData.tipo_usuario !== "docente") {
      navigate("/login");
      return;
    }
    setUser(userData);
    loadData(true);

    const interval = setInterval(() => {
      console.log("Actualizannodoooo");
      loadData(false);
    }, 10000);

    return () => {
      console.log("Limpiando intervalo");
      clearInterval(interval);
    };
  }, [navigate]);

  const loadData = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      await Promise.all([loadEstadisticas(), loadSesionesActivas()]);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };
  const loadEstadisticas = async () => {
    try {
      const data = await sesionService.getEstadisticas();
      setStats(data);
    } catch (error: any) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const loadSesionesActivas = async () => {
    try {
      const data = await sesionService.getSesionesActivas();
      setSesionesActivas(data.sesiones);
    } catch (error: any) {
      console.error("Error al cargar sesiones:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setShowSuccess(false);
    setEnlaceGenerado(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSuccess(false);
    setEnlaceGenerado(null);
  };

  const handleGenerateLink = async (formData: FormData) => {
    try {
      setSubmitting(true);
      console.log("1. Enviando datos:", formData);
      const response = await sesionService.generarEnlace({
        id_horario: formData.id_horario,
        id_lab: formData.id_lab,
        observaciones: formData.observaciones,
      });

      console.log("2. Response recibido:", response); 
      console.log("3. response.sesion:", response.sesion); 
      console.log("4. showSuccess antes:", showSuccess);
      if (response && response.sesion) {
        console.log("5. Entrando al if - seteando enlaceGenerado");

        setEnlaceGenerado({
          token: response.sesion.enlace_token,
          materia: response.sesion.materia,
          grupo: response.sesion.grupo,
          horario: response.sesion.horario,
          dia: response.sesion.dia,
          laboratorio: response.sesion.laboratorio,
          fecha_expiracion: response.sesion.fecha_expiracion,
        });
        console.log("6. Seteando showSuccess a true");
        setShowSuccess(true);
        console.log("7. Recargando data...");
        await loadData(false);
        console.log("8. Todo completado");
      } else {
        console.error("Response no tiene la estructura esperada:", response);
        alert("Error: La respuesta del servidor no tiene el formato esperado");
      }
    } catch (error: any) {
      console.error("Error al generar enlace:", error);
      console.error("Error response:", error.response);
      alert(error.response?.data?.message || "Error al generar el enlace");
    } finally {
      setSubmitting(false);
    }
  };

  const copiarEnlace = (token: string) => {
    const enlaceCompleto = `${window.location.origin}/asistencia/${token}`;
    navigator.clipboard.writeText(enlaceCompleto);
    alert("Enlace copiado al portapapeles");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="simple" />

      <main className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            userName={`${user.nombres} ${user.apellidos}`}
            userEmail={user.correo}
            userCode={user.codigo_usuario}
            icon={GraduationCap}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={BookOpen}
              title="Clases hoy"
              value={stats.clases_hoy}
              subtitle="Programadas"
              variant="primary"
            />
            <StatCard
              icon={Link2}
              title="Sesiones Activos"
              value={stats.sesiones_activas}
              subtitle="Enlaces generados"
              variant="secondary"
            />
            <StatCard
              icon={Users}
              title="Asistencias Hoy"
              value={stats.asistencias_hoy}
              subtitle="Estudiantes registrados"
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
                onClick={handleOpenModal}
              >
                Generar Nuevo Enlace
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 bg-[#a00000] rounded-lg"></div>
              <h2 className="text-3xl font-bold text-[#767676]">
                Sesiones activas Hoy ({sesionesActivas.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#767676]">
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Materia
                    </th>
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Horario
                    </th>
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Grupo
                    </th>
                    <th className="text-left py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Lab
                    </th>
                    <th className="text-center py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Estudiantes
                    </th>
                    <th className="text-center py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="text-center py-4 px-4 text-[#a00000] font-bold text-sm uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sesionesActivas.length > 0 ? (
                    sesionesActivas.map((sesion) => (
                      <tr
                        key={sesion.id_sesion}
                        className="border-b border-[#767676]/20 hover:bg-[#a00000]/5 transition-colors"
                      >
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {sesion.materia}
                        </td>
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {sesion.horario}
                        </td>
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {sesion.grupo}
                        </td>
                        <td className="py-4 px-4 text-[#767676] font-semibold">
                          {sesion.laboratorio}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-red-100 text-[#a00000] rounded-full font-bold text-sm">
                            {sesion.total_estudiantes_registrados}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {sesion.estado_sesion === "activa" ? (
                            <span className="inline-block px-3 py-1 bg-red-100 text-[#a00000] rounded-full font-bold text-xs">
                              🔴 Activa
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 bg-gray-100 text-[#767676] rounded-full font-bold text-xs">
                              ⚪ Cerrada
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => copiarEnlace(sesion.enlace_token)}
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
                        colSpan={7}
                        className="py-8 text-center text-[#767676] font-semibold"
                      >
                        No hay sesiones activas hoy. Genera un enlace para
                        comenzar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Generar Enlace de Asistencia"
        message=""
        cancelText="Cancelar"
        isSuccess={showSuccess}
        successMessage="¡Enlace Generado Exitosamente!"
        enlaceGenerado={enlaceGenerado}
      >
        {!showSuccess && (
          <FormLink onSubmit={handleGenerateLink} isSubmitting={submitting} />
        )}
      </Modal>
      <Footer variant="simple" />
    </div>
  );
}
