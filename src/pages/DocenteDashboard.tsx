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
  ListaAsistenciaModal,
} from "../components";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Link2,
  User,
  UserCog,
  Users,
  X,
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
interface Materia {
  id_asignatura: number;
  codigo_asignatura: string;
  nombre_asignatura: string;
  semestre: string;
}

interface FiltrosReporte {
  fecha_inicio?: string;
  fecha_fin?: string;
  gestion?: number;
}

interface Estudiante {
  id_estudiante: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  nombre_completo: string;
  total_clases: number;
  asistencias: number;
  faltas: number;
  porcentaje: number;
  estado: "aprobado" | "en_riesgo";
}

interface ReporteData {
  materia: {
    id: number;
    codigo: string;
    nombre: string;
    grupo: string;
    gestion: number;
    docente: string;
  };
  estadisticas: {
    total_estudiantes: number;
    total_sesiones: number;
    promedio_asistencia: number;
    aprobados: number;
    en_riesgo: number;
  };
  estudiantes: Estudiante[];
}
export default function DocenteDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [listData, setListData] = useState<any>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<string>("");
  const [grupos, setGrupos] = useState<string[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("");
  const [reporteData, setReporteData] = useState<ReporteData | null>(null);
  const [loadingMaterias, setLoadingMaterias] = useState(false);
  const [loadingGrupos, setLoadingGrupos] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [showReporteModal, setShowReporteModal] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

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
    loadMaterias();

    const interval = setInterval(() => {
      console.log("Actualizannodoooo");
      loadData(false);
    }, 45000);

    return () => {
      console.log("Limpiando intervalo");
      clearInterval(interval);
    };
  }, [navigate]);
  const limpiarFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
  };
  const loadData = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      // setIsRefreshing(true);
    }

    try {
      await Promise.all([loadEstadisticas(), loadSesionesActivas()]);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        // setIsRefreshing(false);
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

  const handleShowListModal = async (idSesion: number) => {
    try {
      setLoadingList(true);
      const data = await sesionService.getListaAsistencia(idSesion);
      setListData(data);
      setShowListModal(true);
    } catch (error: any) {
      console.error("Error al cargar la lista de asistencia:", error);
      alert(
        error.response?.data?.message ||
          "Error al cargar la lista de asistencia"
      );
    } finally {
      setLoadingList(false);
    }
  };

  const handleDescargarPDF = async () => {
    if (!listData) return;

    try {
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-[#800000] text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      loadingToast.textContent = "Generando PDF...";
      document.body.appendChild(loadingToast);

      await sesionService.downloadPDFList(listData.sesion.id_sesion);

      loadingToast.className =
        "fixed top-4 right-4 bg-[#a00000] text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      loadingToast.textContent = "PDF descargado exitosamente";

      setTimeout(() => {
        loadingToast.remove();
      }, 3000);
    } catch (error: any) {
      console.error("Error al descargar PDF:", error);

      // Mostrar mensaje de error
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      errorToast.textContent = "❌ Error al descargar PDF";
      document.body.appendChild(errorToast);

      setTimeout(() => {
        errorToast.remove();
      }, 3000);
    }
  };

  const handleDescargarExcel = async () => {
    if (!listData) return;
    try {
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-[#800000] text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      loadingToast.textContent = "Generando Excel...";
      document.body.appendChild(loadingToast);

      await sesionService.downloadExcelList(listData.sesion.id_sesion);
      loadingToast.className =
        "fixed top-4 right-4 bg-[#a00000] text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      loadingToast.textContent = "Excel descargado exitosamente";

      setTimeout(() => {
        loadingToast.remove();
      }, 3000);
    } catch (error: any) {
      console.error("Error al descargar excel:", error);

      // Mostrar mensaje de error
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
      errorToast.textContent = "❌ Error al descargar Excel";
      document.body.appendChild(errorToast);

      setTimeout(() => {
        errorToast.remove();
      }, 3000);
    }
  };

  const loadMaterias = async () => {
    setLoadingMaterias(true);
    try {
      const response = await sesionService.getMaterias();
      setMaterias(response.materias);
    } catch (error) {
      console.error("Error al cargar materias:", error);
    } finally {
      setLoadingMaterias(false);
    }
  };

  const handleMateriaChange = async (idAsignatura: string) => {
    setMateriaSeleccionada(idAsignatura);
    setGrupoSeleccionado("");
    setReporteData(null);

    if (!idAsignatura) {
      setGrupos([]);
      return;
    }

    const id = Number(idAsignatura);

    setLoadingGrupos(true);
    try {
      const response = await sesionService.getGrupos(id);
      setGrupos(response.grupos);
    } catch (error) {
      console.error("Error al cargar grupos:", error);
    } finally {
      setLoadingGrupos(false);
    }
  };

  const handleGenerarReporte = async () => {
    if (!materiaSeleccionada || !grupoSeleccionado) {
      alert("Por favor selecciona una materia y un grupo");
      return;
    }

    setLoadingReporte(true);
    const id = Number(materiaSeleccionada);

    try {
      const filtros: FiltrosReporte = {};
      if (fechaInicio) filtros.fecha_inicio = fechaInicio;
      if (fechaFin) filtros.fecha_fin = fechaFin;

      const response = await sesionService.getReporteConsolidado(
        id,
        grupoSeleccionado,
        filtros // 🔥 IMPORTANTE: Pasar filtros aquí
      );

      setReporteData(response);
      setShowReporteModal(true);
    } catch (error) {
      console.error("Error al generar reporte:", error);
      alert("Error al generar el reporte");
    } finally {
      setLoadingReporte(false);
    }
  };

  const handleDescargarExcelReporte = async () => {
    if (!materiaSeleccionada || !grupoSeleccionado) return;

    try {
      // 🔥 Construir objeto de filtros
      const filtros: FiltrosReporte = {};
      if (fechaInicio) {
        filtros.fecha_inicio = fechaInicio;
      }

      if (fechaFin) {
        filtros.fecha_fin = fechaFin;
      }

      await sesionService.downloadReporteExcel(
        Number(materiaSeleccionada),
        grupoSeleccionado,
        filtros // 🔥 Pasar los filtros aquí
      );
    } catch (error) {
      console.error("Error al descargar Excel:", error);
      alert("Error al descargar el reporte");
    }
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
            icon={UserCog}
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
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                handleShowListModal(sesion.id_sesion)
                              }
                              disabled={loadingList}
                              className="px-4 py-2 bg-[#a00000] text-white rounded-lg text-sm font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingList ? "Cargando..." : "Ver Lista"}
                            </button>
                            <button
                              onClick={() => copiarEnlace(sesion.enlace_token)}
                              className="px-4 py-2 bg-[#a00000] text-white rounded-lg text-sm font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                              Copiar
                            </button>
                          </div>
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

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mt-8 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-7 h-7 text-[#a00000]" />
              <h2 className="text-3xl font-bold text-[#767676]">
                Reportes Consolidados
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[#767676]/5 to-[#a00000]/5 rounded-xl p-6 border-2 border-dashed border-[#767676]">
              <p className="text-[#767676] font-medium mb-6">
                Genera reportes de asistencia consolidados por materia, grupo y
                rango de fechas
              </p>

              {/* 🔥 GRID DE 5 COLUMNAS - Solo los inputs y el botón "Ver Reporte" */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* Select Materia */}
                <div>
                  <label className="block text-sm font-bold text-[#767676] mb-2">
                    Seleccionar Materia
                  </label>
                  <div className="relative">
                    <select
                      value={materiaSeleccionada}
                      onChange={(e) => handleMateriaChange(e.target.value)}
                      disabled={loadingMaterias}
                      className="w-full px-4 py-3 border-2 border-[#767676] rounded-lg font-semibold text-[#767676] appearance-none bg-white disabled:bg-gray-100"
                    >
                      <option value="">-- Seleccione --</option>
                      {materias.map((materia) => (
                        <option
                          key={materia.id_asignatura}
                          value={materia.id_asignatura}
                        >
                          {materia.codigo_asignatura} -{" "}
                          {materia.nombre_asignatura}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#767676] pointer-events-none" />
                  </div>
                </div>

                {/* Select Grupo */}
                <div>
                  <label className="block text-sm font-bold text-[#767676] mb-2">
                    Seleccionar Grupo
                  </label>
                  <div className="relative">
                    <select
                      value={grupoSeleccionado}
                      onChange={(e) => setGrupoSeleccionado(e.target.value)}
                      disabled={!materiaSeleccionada || loadingGrupos}
                      className="w-full px-4 py-3 border-2 border-[#767676] rounded-lg font-semibold text-[#767676] appearance-none bg-white disabled:bg-gray-100"
                    >
                      <option value="">-- Seleccione --</option>
                      {grupos.map((grupo) => (
                        <option key={grupo} value={grupo}>
                          Grupo {grupo}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#767676] pointer-events-none" />
                  </div>
                </div>

                {/* Fecha Inicio */}
                <div>
                  <label className="block text-sm font-bold text-[#767676] mb-2 flex items-center gap-2">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    max={fechaFin || undefined}
                    className="w-full px-4 py-3 border-2 border-[#767676] rounded-lg font-semibold text-[#767676] bg-white focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all"
                  />
                </div>

                {/* Fecha Fin */}
                <div>
                  <label className="block text-sm font-bold text-[#767676] mb-2 flex items-center gap-2">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    min={fechaInicio || undefined}
                    className="w-full px-4 py-3 border-2 border-[#767676] rounded-lg font-semibold text-[#767676] bg-white focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all"
                  />
                </div>

                {/* Botón Ver Reporte */}
                <div className="flex flex-col gap-2 justify-end">
                  <button
                    onClick={handleGenerarReporte}
                    disabled={
                      !materiaSeleccionada ||
                      !grupoSeleccionado ||
                      loadingReporte
                    }
                    className="px-6 py-3 bg-[#a00000] text-white rounded-lg font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loadingReporte ? "Generando..." : "Ver Reporte"}
                  </button>
                </div>
              </div>
              {/* ⬆️ AQUÍ TERMINA EL GRID DE 5 COLUMNAS */}

              {/* 🔥 FILA DE BOTONES ADICIONALES - FUERA DEL GRID */}
              <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-[#767676]/20">
                <button
                  onClick={handleDescargarExcelReporte}
                  disabled={!materiaSeleccionada || !grupoSeleccionado}
                  className="px-6 py-3 bg-[#a00000] text-white rounded-lg font-bold hover:bg-[#800000] transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Descargar Excel
                </button>

                {/* Botón Limpiar Filtros */}
                {(fechaInicio || fechaFin) && (
                  <button
                    onClick={limpiarFiltros}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Limpiar Fechas
                  </button>
                )}
              </div>

              {/* 🔥 INDICADOR DE FILTROS ACTIVOS - FUERA DEL GRID */}
              {(fechaInicio || fechaFin) && (
                <div className="mt-4 p-4 bg-[#a00000]/10 border-2 border-[#a00000] rounded-lg flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Calendar className="w-5 h-5 text-[#a00000]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#a00000] mb-1">
                      Filtros de fecha activos
                    </p>
                    <div className="text-sm text-[#767676] font-semibold">
                      {fechaInicio && (
                        <span>
                          Desde:{" "}
                          {new Date(
                            fechaInicio + "T00:00:00"
                          ).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {fechaInicio && fechaFin && (
                        <span className="mx-2">•</span>
                      )}
                      {fechaFin && (
                        <span>
                          Hasta:{" "}
                          {new Date(fechaFin + "T00:00:00").toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ListaAsistenciaModal
          isOpen={showListModal}
          onClose={() => setShowListModal(false)}
          sesion={listData?.sesion || null}
          asistencias={listData?.asistencias || []}
          totalEstudiantes={listData?.total_estudiantes || 0}
          onDescargarPDF={handleDescargarPDF}
          onDescargarExcel={handleDescargarExcel}
        />
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
      {showReporteModal && reporteData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-linear-to-r from-[#a00000] to-[#767676] p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Reporte Consolidado de Asistencia
                  </h3>
                  <p className="text-sm opacity-90">
                    {reporteData.materia.codigo} - {reporteData.materia.nombre}{" "}
                    | Grupo {reporteData.materia.grupo}
                  </p>
                </div>
                <button
                  onClick={() => setShowReporteModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg border-2 border-[#a00000]">
                  <div className="text-2xl font-bold text-[#a00000]">
                    {reporteData.estadisticas.total_estudiantes}
                  </div>
                  <div className="text-xs text-[#a00000] font-semibold">
                    Total Estudiantes
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#a00000]">
                  <div className="text-2xl font-bold text-[#a00000]">
                    {reporteData.estadisticas.total_sesiones}
                  </div>
                  <div className="text-xs text-[#a00000] font-semibold">
                    Total Clases
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#a00000]">
                  <div className="text-2xl font-bold text-[#a00000]">
                    {reporteData.estadisticas.promedio_asistencia.toFixed(1)}%
                  </div>
                  <div className="text-xs text-[#a00000] font-semibold">
                    Promedio Asistencia
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#a00000]">
                  <div className="text-2xl font-bold text-[#a00000]">
                    {reporteData.estadisticas.aprobados}
                  </div>
                  <div className="text-xs text-[#a00000] font-semibold">
                    Aprobados (≥80%)
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#a00000]">
                  <div className="text-2xl font-bold text-[#a00000]">
                    {reporteData.estadisticas.en_riesgo}
                  </div>
                  <div className="text-xs text-[#a00000] font-semibold">
                    En Riesgo (&lt;80%)
                  </div>
                </div>
              </div>

              {/* Tabla de estudiantes */}
              <div className="overflow-auto max-h-96">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr className="border-b-2 border-[#767676]">
                      <th className="text-left py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        Código
                      </th>
                      <th className="text-left py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        Estudiante
                      </th>
                      <th className="text-center py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        Asistencias
                      </th>
                      <th className="text-center py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        Faltas
                      </th>
                      <th className="text-center py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        %
                      </th>
                      <th className="text-center py-3 px-4 text-[#a00000] font-bold text-xs uppercase">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporteData.estudiantes.map((est) => (
                      <tr
                        key={est.id_estudiante}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-semibold text-[#a00000]">
                          {est.codigo}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-[#767676]">
                          {est.nombre_completo}
                        </td>
                        <td className="py-3 px-4 text-center text-sm font-bold text-[#767676]">
                          {est.asistencias}/{est.total_clases}
                        </td>
                        <td className="py-3 px-4 text-center text-sm font-bold text-[#767676]">
                          {est.faltas}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              est.porcentaje >= 80
                                ? "bg-gray-400 text-white"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {est.porcentaje}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {est.estado === "aprobado" ? (
                            <span className="px-2 py-1 bg-gray-300 text-[#a00000] rounded-full text-xs font-bold">
                              Aprobado
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-300 text-[#a00000] rounded-full text-xs font-bold">
                              En Riesgo
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => setShowReporteModal(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold hover:bg-gray-500 transition-all hover:scale-105 shadow-md"
              >
                Cerrar
              </button>
              <button
                onClick={handleDescargarExcelReporte}
                className="px-6 py-2 bg-[#a00000] text-white rounded-lg font-bold hover:bg-[#8a0000] transition-all hover:scale-105 shadow-md flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Descargar Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
