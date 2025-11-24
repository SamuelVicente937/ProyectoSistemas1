import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { DashboardHeader, Footer, Navbar, StatCard } from "../components";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { asistenciaService } from "../api/asistenciaService";

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  tipo_usuario: "docente" | "estudiante" | "personal";
}
interface ClaseHoy {
  id_horario: number;
  materia: string;
  grupo: string;
  horario: string;
  dia: string;
  laboratorio?: string;
  tiene_sesion_activa: boolean;
  ya_registro_asistencia: boolean;
  token_sesion?: string;
}

interface AsistenciaHistorial {
  id_asistencia: number;
  fecha: string;
  hora_registro: string;
  materia: string;
  grupo: string;
  equipo: string;
  laboratorio: string;
  // estado_equipo: "operativo" | "con_fallas";
  // observaciones?: string;
  tiene_observaciones: boolean;
}

interface Estadisticas {
  materias_inscritas: number;
  asistencias_registradas: number;
  porcentaje_asistencia: number;
}

interface ProblemaReportado {
  id_reporte: number;
  fecha: string;
  laboratorio: string;
  equipo: string;
  problema: string;
  descripcion: string;
  estado: "pendiente" | "en_proceso" | "resuelto";
}

export default function EstudianteDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState<Estadisticas>({
    materias_inscritas: 0,
    asistencias_registradas: 0,
    porcentaje_asistencia: 0,
  });
  const [clasesHoy, setClasesHoy] = useState<ClaseHoy[]>([]);
  const [historial, setHistorial] = useState<AsistenciaHistorial[]>([]);
  const [problemasReportados, setProblemasReportados] = useState<
    ProblemaReportado[]
  >([]);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData || userData.tipo_usuario !== "estudiante") {
      navigate("/login");
      return;
    }
    setUser(userData);
    loadData();
    const interval = setInterval(() => {
      loadData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      // Cargar historial de asistencias
      const historialData = await asistenciaService.obtenerMisAsistencias();
      setHistorial(historialData.asistencias || []);

      // Cargar resumen por materia (estadísticas)
      const resumenData = await asistenciaService.obtenerResumenPorMateria();

      if (resumenData.materias && resumenData.materias.length > 0) {
        const totalMaterias = resumenData.materias.length;
        const promedioAsistencia =
          resumenData.materias.reduce(
            (sum: number, m: any) => sum + m.porcentaje,
            0
          ) / totalMaterias;

        setEstadisticas({
          materias_inscritas: totalMaterias,
          asistencias_registradas: historialData.total_asistencias || 0,
          porcentaje_asistencia: Math.round(promedioAsistencia),
        });
      }

      // Cargar clases de hoy ✅
      const clasesData = await asistenciaService.obtenerClasesHoy();
      setClasesHoy(clasesData.clases_hoy || []);

      // Cargar reportes de problemas ✅
      const reportesData = await asistenciaService.obtenerMisReportes();
      setProblemasReportados(reportesData.reportes || []);
    } catch (error: any) {
      console.error("❌ Error al cargar datos:", error);
      if (error.response?.status === 401) {
        authService.logout();
        navigate("/login");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };
  const getEstadoBadge = (estado: "pendiente" | "en_proceso" | "resuelto") => {
    switch (estado) {
      case "pendiente":
        return {
          color: "border-red-600 text-white bg-red-600",
          icon: <Clock className="h-4 w-4" />,
          label: "Pendiente",
        };
      case "en_proceso":
        return {
          color: "border-yellow-500 text-white bg-yellow-500",
          icon: <AlertCircle className="h-4 w-4" />,
          label: "En Revisión",
        };
      case "resuelto":
        return {
          color: "border-green-600 text-white bg-green-600",
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: "Resuelto",
        };
    }
  };
  const handleRegistrarAsistencia = (token: string) => {
    navigate(`/asistencia/${token}`);
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
              icon={GraduationCap}
              title="Materias Inscritas"
              value={estadisticas.materias_inscritas}
              subtitle="Activas"
              variant="primary"
            />
            <StatCard
              icon={CheckCircle2}
              title="Asistencias Registradas"
              value={estadisticas.asistencias_registradas}
              subtitle="Registradas"
              variant="secondary"
            />
            <StatCard
              icon={UserRoundCheck}
              title="Asistencia %"
              value={`${estadisticas.porcentaje_asistencia}%`}
              subtitle="Porcentaje de asistencia"
              variant="warning"
            />
          </div>
          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-[#a00000]">
                Mis Clases Hoy ({clasesHoy.length})
              </h2>
            </div>

            {clasesHoy.length > 0 ? (
              clasesHoy.map((clase) => (
                <div
                  key={clase.id_horario}
                  className="relative bg-gradient-to-br from-[#767676]/5 to-[#a00000]/5 rounded-xl p-8 border-2 border-[#a00000] text-start"
                >
                  <span
                    className={`absolute top-3 right-3 text-sm font-semibold px-3 py-1 rounded-full border flex items-center gap-1 ${
                      clase.ya_registro_asistencia
                        ? "border-green-600 text-white bg-green-600"
                        : clase.tiene_sesion_activa
                        ? "border-[#a00000] text-white bg-[#a00000] animate-pulse"
                        : "border-gray-400 text-gray-600 bg-gray-100"
                    }`}
                  >
                    {clase.ya_registro_asistencia ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Registrado
                      </>
                    ) : clase.tiene_sesion_activa ? (
                      <>
                        <Clock className="h-3 w-3" />
                        Sesión Activa
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Sin Sesión
                      </>
                    )}
                  </span>

                  <h3 className="text-[#a00000] text-lg font-semibold mb-6">
                    {clase.materia} - Grupo {clase.grupo}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-900">
                      <Clock className="w-6 h-6 flex-shrink-0 text-[#a00000]" />
                      <p className="text-md font-medium">
                        {clase.dia} {clase.horario}
                      </p>
                    </div>
                    {clase.laboratorio && (
                      <div className="flex items-center gap-3 text-[#767676]">
                        <MapPin className="w-6 h-6 flex-shrink-0 text-[#a00000]" />
                        <p className="text-md font-medium">
                          {clase.laboratorio}
                        </p>
                      </div>
                    )}
                  </div>

                  {!clase.ya_registro_asistencia &&
                    clase.tiene_sesion_activa &&
                    clase.token_sesion && (
                      <button
                        onClick={() =>
                          handleRegistrarAsistencia(clase.token_sesion!)
                        }
                        className="w-full py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-102 shadow-md"
                      >
                        Registrar Asistencia
                      </button>
                    )}

                  {!clase.tiene_sesion_activa &&
                    !clase.ya_registro_asistencia && (
                      <div className="w-full px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold text-center">
                        Esperando que el docente active la sesión
                      </div>
                    )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#767676]">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">
                  No tienes clases programadas para hoy
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-[#a00000]">
                Mi Historial de Asistencias ({historial.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-[#767676] rounded-xl overflow-hidden border-collapse">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-bold text-[#a00000] uppercase tracking-widest">
                      Fecha
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-[#a00000] uppercase tracking-widest">
                      Materia
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-[#a00000] uppercase tracking-widest">
                      Lab/Equipo
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-[#a00000] uppercase tracking-widest">
                      Estado Equipo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {historial.map((asistencia) => (
                    <tr
                      key={asistencia.id_asistencia}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-white transition-all duration-300 hover:shadow-md cursor-pointer"
                      // onClick={() => navigate(`/estudiante/asistencia/${asistencia.id_asistencia}`)}
                    >
                      <td className="px-8 py-5 whitespace-nowrap text-sm">
                        <div className="font-semibold text-gray-900">
                          {new Date(asistencia.fecha).toLocaleDateString(
                            "es-BO"
                          )}
                        </div>
                        <div className="text-xs text-[#767676] mt-1">
                          {asistencia.hora_registro}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm">
                        <div className="font-semibold text-gray-900">
                          {asistencia.materia}
                        </div>
                        <div className="text-xs text-[#767676] mt-1 font-medium">
                          Grupo {asistencia.grupo}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm">
                        <div className="font-semibold text-gray-900">
                          {asistencia.laboratorio}
                        </div>
                        <div className="text-xs text-[#767676] mt-1 font-medium">
                          {asistencia.equipo}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        {asistencia.tiene_observaciones ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#a00000] text-white border border-[#a00000] uppercase tracking-wider">
                            <AlertCircle className="w-4 h-4" />
                            Con Reporte
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gray-200 text-[#a00000] border border-gray-200 uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4" />
                            Sin Problemas
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#a00000]">
                Mis Reportes de Problemas ({problemasReportados.length})
              </h2>

              <div className="flex gap-3 text-sm">
                <span className="px-3 py-1 bg-[#a00000] text-white rounded-full font-bold">
                  ⚪{" "}
                  {
                    problemasReportados.filter((p) => p.estado === "pendiente")
                      .length
                  }{" "}
                  Pendientes
                </span>
                <span className="px-3 py-1 bg-gray-200 text-[#a00000] rounded-full font-bold">
                  🔴{" "}
                  {
                    problemasReportados.filter(
                      (p) => p.estado === "en_proceso"
                    ).length
                  }{" "}
                  En Revisión
                </span>
                <span className="px-3 py-1 bg-[#a00000] text-white rounded-full font-bold">
                  ◻️{" "}
                  {
                    problemasReportados.filter((p) => p.estado === "resuelto")
                      .length
                  }{" "}
                  Resueltos
                </span>
              </div>
            </div>

            {problemasReportados.length > 0 ? (
              <div className="space-y-4">
                {problemasReportados.map((reporte) => {
                  const badge = getEstadoBadge(reporte.estado);

                  return (
                    <div
                      key={reporte.id_reporte}
                      className="relative bg-gray-50 rounded-xl p-6 border-2 border-[#a00000] hover:shadow-md transition-all"
                    >
                      <div
                        className={`absolute top-3 right-3 text-sm font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1 ${badge.color}`}
                      >
                        {badge.icon}
                        {badge.label}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="font-bold text-gray-900">
                            {new Date(reporte.fecha).toLocaleDateString(
                              "es-BO"
                            )}
                          </span>
                          <span>•</span>
                          <span className="font-semibold">
                            {reporte.laboratorio}
                          </span>
                          <span>•</span>
                          <span className="font-semibold">
                            {reporte.equipo}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">
                          {reporte.problema}
                        </h3>

                        <p className="text-gray-700 text-sm">
                          {reporte.descripcion}
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                          {reporte.estado === "pendiente" && (
                            <span className="text-xs text-red-600 font-semibold">
                              Esperando revisión del personal de cómputo
                            </span>
                          )}
                          {reporte.estado === "en_proceso" && (
                            <span className="text-xs text-yellow-600 font-semibold">
                              El personal está trabajando en resolver el
                              problema
                            </span>
                          )}
                          {reporte.estado === "resuelto" && (
                            <span className="text-xs text-green-600 font-semibold">
                              Problema resuelto exitosamente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">
                  No has reportado ningún problema
                </p>
                <p className="text-sm mt-2">
                  Cuando encuentres un equipo con fallas, repórtalo al registrar
                  tu asistencia
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
