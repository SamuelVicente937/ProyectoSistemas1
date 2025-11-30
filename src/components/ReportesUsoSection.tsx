import { useState, useEffect } from "react";
import {
  Download,
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Filter,
  Clock,
  BarChart3,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { personalService } from "../api/personalService";
import StatCard from "./StatCard";

// 📊 TIPOS
interface Laboratorio {
  id_lab: number;
  codigo_lab: string;
  nombre_lab: string;
}

interface FiltrosReporteUso {
  id_laboratorio?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  id_asignatura?: number;
  turno?: "mañana" | "tarde";
}

interface EstadisticasLaboratorio {
  total_sesiones: number;
  total_estudiantes_atendidos: number;
  promedio_estudiantes: number;
  tasa_ocupacion: number;
}

interface Materia {
  codigo: string;
  nombre: string;
}

interface HorarioPico {
  hora: string;
  sesiones: number;
}

interface ReporteLaboratorio {
  laboratorio: {
    id: number;
    codigo: string;
    nombre: string;
    capacidad: number;
  };
  estadisticas: EstadisticasLaboratorio;
  materias: Materia[];
  uso_por_dia: Record<string, number>;
  horarios_pico: HorarioPico[];
}

interface ReporteUsoCompleto {
  filtros_aplicados: FiltrosReporteUso;
  estadisticas_generales: {
    total_laboratorios_usados: number;
    total_sesiones: number;
    total_estudiantes_atendidos: number;
    promedio_sesiones_por_lab: number;
    laboratorio_mas_usado: ReporteLaboratorio | null;
  };
  reporte_por_laboratorio: ReporteLaboratorio[];
}

const ReportesUsoSection = () => {
  const [reporte, setReporte] = useState<ReporteUsoCompleto | null>(null);
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [filtros, setFiltros] = useState<FiltrosReporteUso>({});
  const [loading, setLoading] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [labsData, reporteData] = await Promise.all([
        personalService.getLaboratorios(),
        personalService.getReporteUsoLaboratorios(filtros),
      ]);
      setLaboratorios(labsData.laboratorios);
      setReporte(reporteData);
    } catch (error: any) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltrosChange = async () => {
    setLoading(true);
    try {
      const data = await personalService.getReporteUsoLaboratorios(filtros);
      setReporte(data);
    } catch (error) {
      console.error("Error al cargar reporte:", error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFiltros = () => {
    setFiltros({});
    loadInitialData();
  };

  const handleDescargarExcel = async () => {
    setDescargando(true);
    try {
      await personalService.descargarReporteUsoExcel(filtros);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("Error al descargar el reporte");
    } finally {
      setDescargando(false);
    }
  };

  const stats = reporte?.estadisticas_generales;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#767676] shadow-lg overflow-hidden">
      {/* HEADER COLAPSABLE */}
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#a00000] rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#a00000]">
              Reportes de Uso de Laboratorios
            </h2>
            <p className="text-sm text-[#767676] font-semibold">
              Analiza el uso y rendimiento de los laboratorios
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!expanded && stats && (
            <div className="hidden md:flex items-center gap-4 text-sm font-bold text-[#767676]">
              <span>{stats.total_laboratorios_usados} Labs</span>
              <span>•</span>
              <span>{stats.total_sesiones} Sesiones</span>
            </div>
          )}
          {expanded ? (
            <ChevronUp className="w-6 h-6 text-[#767676]" />
          ) : (
            <ChevronDown className="w-6 h-6 text-[#767676]" />
          )}
        </div>
      </div>

      {/* CONTENIDO EXPANDIBLE */}
      {expanded && (
        <div className="p-6 pt-0 space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-[#767676] text-lg">Cargando...</div>
            </div>
          ) : (
            <>
              {/* BOTÓN DESCARGAR */}
              <div className="flex justify-end">
                <button
                  onClick={handleDescargarExcel}
                  disabled={descargando || !reporte}
                  className="px-6 py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {descargando ? "Descargando..." : "Descargar Excel"}
                </button>
              </div>

              {/* ESTADÍSTICAS GENERALES */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={Building2}
                    title="Laboratorios Usados"
                    value={stats.total_laboratorios_usados}
                    subtitle="En el período"
                    variant="primary"
                  />
                  <StatCard
                    icon={Calendar}
                    title="Total Sesiones"
                    value={stats.total_sesiones}
                    subtitle="Realizadas"
                    variant="secondary"
                  />
                  <StatCard
                    icon={Users}
                    title="Estudiantes"
                    value={stats.total_estudiantes_atendidos}
                    subtitle="Atendidos"
                    variant="warning"
                  />
                  <StatCard
                    icon={BarChart3}
                    title="Promedio"
                    value={stats.promedio_sesiones_por_lab.toFixed(1)}
                    subtitle="Sesiones/Lab"
                    variant="primary"
                  />
                </div>
              )}

              {/* LABORATORIO MÁS USADO */}
              {stats?.laboratorio_mas_usado && (
                <div className="bg-gradient-to-r from-[#a00000] to-[#800000] rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-black text-white">
                      Laboratorio Más Usado
                    </h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-black text-white mb-1">
                      {stats.laboratorio_mas_usado.laboratorio.codigo}
                    </p>
                    <p className="text-lg text-white/90 font-semibold">
                      {stats.laboratorio_mas_usado.estadisticas.total_sesiones}{" "}
                      sesiones realizadas
                    </p>
                  </div>
                </div>
              )}

              {/* FILTROS */}
              <div className="bg-gray-50 rounded-xl border border-gray-300 p-6">
                <button
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="flex items-center gap-2 text-lg font-bold text-[#a00000] mb-4 hover:text-[#800000] transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  Filtros de Búsqueda
                  {mostrarFiltros ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {mostrarFiltros && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      {/* Laboratorio */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-[#767676] uppercase tracking-wider mb-2">
                          <Building2 className="w-4 h-4" />
                          Laboratorio
                        </label>
                        <select
                          value={filtros.id_laboratorio || ""}
                          onChange={(e) =>
                            setFiltros({
                              ...filtros,
                              id_laboratorio: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border-2 border-[#767676] rounded-lg font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 text-sm"
                        >
                          <option value="">Todos</option>
                          {laboratorios.map((lab) => (
                            <option key={lab.id_lab} value={lab.id_lab}>
                              {lab.codigo_lab} - {lab.nombre_lab}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Fecha Inicio */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-[#767676] uppercase tracking-wider mb-2">
                          <Calendar className="w-4 h-4" />
                          Fecha Inicio
                        </label>
                        <input
                          type="date"
                          value={filtros.fecha_inicio || ""}
                          onChange={(e) =>
                            setFiltros({
                              ...filtros,
                              fecha_inicio: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border-2 border-[#767676] rounded-lg font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 text-sm"
                        />
                      </div>

                      {/* Fecha Fin */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-[#767676] uppercase tracking-wider mb-2">
                          <Calendar className="w-4 h-4" />
                          Fecha Fin
                        </label>
                        <input
                          type="date"
                          value={filtros.fecha_fin || ""}
                          onChange={(e) =>
                            setFiltros({ ...filtros, fecha_fin: e.target.value })
                          }
                          min={filtros.fecha_inicio}
                          className="w-full px-3 py-2 bg-white border-2 border-[#767676] rounded-lg font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 text-sm"
                        />
                      </div>

                      {/* Turno */}
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-[#767676] uppercase tracking-wider mb-2">
                          <Clock className="w-4 h-4" />
                          Turno
                        </label>
                        <select
                          value={filtros.turno || ""}
                          onChange={(e) =>
                            setFiltros({
                              ...filtros,
                              turno: e.target.value
                                ? (e.target.value as "mañana" | "tarde")
                                : undefined,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border-2 border-[#767676] rounded-lg font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 text-sm"
                        >
                          <option value="">Todos</option>
                          <option value="mañana">Mañana</option>
                          <option value="tarde">Tarde</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleFiltrosChange}
                        className="flex-1 px-4 py-2 bg-[#a00000] text-white rounded-lg font-bold hover:bg-[#8a0000] transition-all duration-300 text-sm"
                      >
                        Aplicar Filtros
                      </button>
                      <button
                        onClick={limpiarFiltros}
                        className="px-4 py-2 border-2 border-[#767676] text-[#767676] rounded-lg font-bold hover:bg-[#767676] hover:text-white transition-all duration-300 text-sm"
                      >
                        Limpiar
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* DETALLE POR LABORATORIO */}
              <div>
                <h3 className="text-xl font-bold text-[#a00000] mb-4">
                  Detalle por Laboratorio (
                  {reporte?.reporte_por_laboratorio.length || 0})
                </h3>

                {reporte && reporte.reporte_por_laboratorio.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reporte.reporte_por_laboratorio.map((labReporte, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-[#a00000] p-4 hover:shadow-xl transition-shadow"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-[#a00000] rounded-lg">
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">
                                {labReporte.laboratorio.codigo}
                              </h4>
                              <p className="text-xs text-[#767676] font-semibold">
                                {labReporte.laboratorio.nombre}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#767676] font-bold uppercase">
                              Cap.
                            </p>
                            <p className="text-xl font-black text-[#a00000]">
                              {labReporte.laboratorio.capacidad}
                            </p>
                          </div>
                        </div>

                        {/* Estadísticas Grid */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3 text-[#a00000]" />
                              <p className="text-xs text-[#767676] font-bold">
                                Sesiones
                              </p>
                            </div>
                            <p className="text-xl font-black text-gray-900">
                              {labReporte.estadisticas.total_sesiones}
                            </p>
                          </div>

                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Users className="w-3 h-3 text-[#a00000]" />
                              <p className="text-xs text-[#767676] font-bold">
                                Estudiantes
                              </p>
                            </div>
                            <p className="text-xl font-black text-gray-900">
                              {labReporte.estadisticas.total_estudiantes_atendidos}
                            </p>
                          </div>

                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Users className="w-3 h-3 text-[#a00000]" />
                              <p className="text-xs text-[#767676] font-bold">
                                Promedio
                              </p>
                            </div>
                            <p className="text-xl font-black text-gray-900">
                              {labReporte.estadisticas.promedio_estudiantes}
                            </p>
                          </div>

                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <TrendingUp className="w-3 h-3 text-[#a00000]" />
                              <p className="text-xs text-[#767676] font-bold">
                                Ocupación
                              </p>
                            </div>
                            <p className="text-xl font-black text-[#a00000]">
                              {labReporte.estadisticas.tasa_ocupacion}%
                            </p>
                          </div>
                        </div>

                        {/* Materias */}
                        <div className="mb-3">
                          <h5 className="text-xs font-bold text-[#767676] mb-2 uppercase">
                            Materias ({labReporte.materias.length})
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {labReporte.materias.slice(0, 3).map((materia, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-red-100 text-[#a00000] rounded-full text-xs font-bold"
                              >
                                {materia.codigo}
                              </span>
                            ))}
                            {labReporte.materias.length > 3 && (
                              <span className="px-2 py-1 bg-gray-200 text-[#767676] rounded-full text-xs font-bold">
                                +{labReporte.materias.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Horarios Pico */}
                        {labReporte.horarios_pico.length > 0 && (
                          <div>
                            <h5 className="text-xs font-bold text-[#767676] mb-2 uppercase">
                              Horarios Pico
                            </h5>
                            <div className="space-y-1">
                              {labReporte.horarios_pico.map((horario, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center text-xs bg-gray-50 rounded-lg p-2"
                                >
                                  <span className="font-bold text-gray-900">
                                    {horario.hora}
                                  </span>
                                  <span className="text-[#767676] font-semibold">
                                    {horario.sesiones} sesiones
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#767676]">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-bold">
                      No hay datos para mostrar con los filtros aplicados
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ReportesUsoSection;