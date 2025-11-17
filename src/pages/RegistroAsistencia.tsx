// src/pages/RegistroAsistencia.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { CheckCircle, AlertCircle } from "lucide-react";
import api from "../api/axios";

interface Equipo {
  id_equipo: number;
  codigo_equipo: string;
  numero_equipo: number;
  marca: string;
  modelo: string;
  ocupado: boolean;
}

interface SesionData {
  id_sesion: number;
  materia: string;
  grupo: string;
  horario: string;
  dia: string;
  fecha: string;
  laboratorio: {
    codigo: string;
    nombre: string;
    capacidad: number;
    piso: number;
  };
  equipos: Equipo[];
  observaciones?: string;
  estudiantes_registrados: number;
  expira_en: string;
}

interface SuccessData {
  equipmentCode: string;
  horaRegistro: string;
}

type EstadoEquipo = "operativo" | "con_fallas";

const RegistroAsistencia = () => {
  const { token } = useParams<{ token: string }>();
  //   const navigate = useNavigate();

  const [sesion, setSesion] = useState<SesionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(
    null
  );
  const [equipmentState, setEquipmentState] =
    useState<EstadoEquipo>("operativo");
  const [problemDescription, setProblemDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [stage, setStage] = useState<"form" | "success">("form");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  useEffect(() => {
    loadSesionData();
  }, [token]);

  const loadSesionData = async () => {
    try {
      setLoading(true);
      console.log("🔍 Buscando sesión con token:", token);

      const response = await api.get(`/sesion/${token}`);
      console.log("✅ Respuesta completa del API:", response.data);
      console.log("✅ Sesión:", response.data.sesion);
      console.log("✅ Equipos recibidos:", response.data.sesion?.equipos);

      setSesion(response.data.sesion);
    } catch (err: any) {
      console.error("❌ Error al cargar sesión:", err);
      setError(
        err.response?.data?.message ||
          "No se pudo cargar la información de la sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEquipment = (id: number) => {
    setSelectedEquipment(selectedEquipment === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEquipment) {
      alert("Por favor selecciona un equipo");
      return;
    }

    if (equipmentState === "con_fallas" && !problemDescription.trim()) {
      alert("Por favor describe el problema del equipo");
      return;
    }

    try {
      setSubmitting(true);

      const payload: any = {
        id_sesion: sesion!.id_sesion,
        id_equipo: selectedEquipment,
      };

      // Si hay fallas, agregar observaciones
      if (equipmentState === "con_fallas" && problemDescription.trim()) {
        payload.observaciones = problemDescription.trim();
      }

      const response = await api.post("/asistencia/registrar", payload);

      console.log("✅ Asistencia registrada:", response.data);

      // Redirigir a página de éxito o mostrar mensaje
      alert("¡Asistencia registrada exitosamente!");
      // navigate('/dashboard'); // O donde quieras redirigir
      const equipoSeleccionado = sesion?.equipos.find(
        (e) => e.id_equipo === selectedEquipment
      );
      setSuccessData({
        equipmentCode: equipoSeleccionado?.codigo_equipo || "N/A",
        horaRegistro: new Date().toLocaleTimeString("es-BO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });
      setStage("success");
    } catch (err: any) {
      console.error("❌ Error al registrar asistencia:", err);
      alert(err.response?.data?.message || "Error al registrar la asistencia");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setStage("form");
    setSelectedEquipment(null);
    setEquipmentState("operativo");
    setProblemDescription("");
    setSuccessData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-[#767676] text-lg font-semibold">Cargando...</div>
      </div>
    );
  }

  if (error || !sesion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <div className="mb-6">
            <AlertCircle className="w-20 h-20 text-[#a00000] mx-auto" />
          </div>
          <h1 className="text-4xl font-black text-[#a00000] mb-4">Error</h1>
          <p className="text-[#767676] font-semibold mb-4">
            {error || "Sesión no encontrada"}
          </p>
          <p className="text-sm text-[#767676]/60 font-semibold">
            El enlace puede estar expirado o ser inválido.
          </p>
        </div>
      </div>
    );
  }

  if (stage === "success" && successData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="mb-6 animate-bounce">
                <CheckCircle className="w-20 h-20 text-[#a00000]" />
              </div>
              <h1 className="text-4xl font-black text-[#a00000] mb-2">
                ¡Asistencia Registrada!
              </h1>
              <p className="text-[#767676] text-lg font-semibold">
                Tu asistencia ha sido registrada exitosamente en el equipo{" "}
                {successData.equipmentCode}
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#767676] to-[#a00000] rounded-2xl p-8 text-white mb-8 shadow-lg">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase">
                Resumen
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-semibold opacity-90 mb-1">
                    MATERIA
                  </p>
                  <p className="text-xl font-black">{sesion.materia}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-semibold opacity-90 mb-1">
                    EQUIPO
                  </p>
                  <p className="text-xl font-black">
                    {successData.equipmentCode}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-semibold opacity-90 mb-1">HORA</p>
                  <p className="text-xl font-black">
                    {successData.horaRegistro}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-semibold opacity-90 mb-1">
                    ESTADO
                  </p>
                  <p className="text-xl font-black">
                    {equipmentState === "operativo"
                      ? "✓ Operativo"
                      : "⚠ Con Fallas"}
                  </p>
                </div>
              </div>

              {problemDescription && (
                <div className="bg-white/20 rounded-xl p-4 border-l-4 border-[#a00000]">
                  <p className="text-sm font-semibold opacity-90 mb-2">
                    PROBLEMA REPORTADO
                  </p>
                  <p className="text-white">{problemDescription}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleBackToForm}
              className="w-full px-6 py-4 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
            >
              Volver al Formulario
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-40 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6 animate-bounce">
              <CheckCircle className="w-20 h-20 text-[#a00000] mx-auto" />
            </div>
            <h1 className="text-4xl font-black text-[#767676] mb-2">
              ¡Ya estás aquí!
            </h1>
            <p className="text-[#767676]/60 text-lg font-semibold">
              Revisa los datos de la sesión y registra tu asistencia
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#767676] to-[#a00000] rounded-2xl p-8 text-white mb-8 shadow-lg">
            <h2 className="text-lg font-black mb-6 flex items-center gap-2">
              Información de la Sesión
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">MATERIA</p>
                <p className="text-xl font-black">{sesion.materia}</p>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">GRUPO</p>
                <p className="text-xl font-black">{sesion.grupo}</p>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">HORARIO</p>
                <p className="text-xl font-black">{sesion.horario}</p>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">DÍA</p>
                <p className="text-xl font-black">{sesion.dia}</p>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">FECHA</p>
                <p className="text-xl font-black">{sesion.fecha}</p>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm font-semibold opacity-90 mb-1">
                  LABORATORIO
                </p>
                <p className="text-xl font-black">
                  {sesion.laboratorio.codigo}
                </p>
                <p className="text-xs font-semibold opacity-75 mt-1">
                  Piso {sesion.laboratorio.piso}
                </p>
              </div>

              <div className="bg-white/20 rounded-xl p-4 col-span-2">
                <p className="text-sm font-semibold opacity-90 mb-1">
                  CAPACIDAD
                </p>
                <p className="text-xl font-black">
                  {sesion.estudiantes_registrados} /{" "}
                  {sesion.laboratorio.capacidad} equipos
                </p>
              </div>
            </div>
          </div>

          {sesion.observaciones && (
            <div className="bg-red-100 border-l-4 border-[#a00000] rounded-lg p-4 mb-8 flex gap-3">
              <AlertCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-2.5" />
              <div>
                <p className="text-[#767676] font-black text-sm mb-1">
                  OBSERVACIONES DEL DOCENTE:
                </p>
                <p className="text-[#767676] font-semibold text-sm">
                  {sesion.observaciones}
                </p>
              </div>
            </div>
          )}

          {/* Advertencia importante */}
          <div className="bg-red-100 border-l-4 border-[#a00000] rounded-lg p-4 mb-8 flex gap-3">
            <AlertCircle className="w-6 h-6 text-[#a00000] flex-shrink-0 mt-2.5" />
            <p className="text-[#767676] font-semibold text-sm">
              <span className="font-black">IMPORTANTE:</span> Selecciona el
              equipo donde te encuentras trabajando. Una vez registrada tu
              asistencia, no podrás cambiar de equipo.
            </p>
          </div>

          {/* FORMULARIO DE REGISTRO */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Selección de equipos */}
            <div>
              <label className="block text-sm font-black text-[#a00000] uppercase tracking-wider mb-4">
                Selecciona tu equipo
              </label>

              {/* DEBUG: Mostrar info de equipos
              <div className="mb-4 p-3 bg-blue-50 rounded text-xs">
                <p className="font-bold">DEBUG:</p>
                <p>Total equipos: {sesion.equipos?.length || 0}</p>
                <p>Equipos: {JSON.stringify(sesion.equipos)}</p>
              </div> */}

              <div className="grid grid-cols-4 gap-3">
                {sesion.equipos && sesion.equipos.length > 0 ? (
                  sesion.equipos.map((equipo) => (
                    <button
                      key={equipo.id_equipo}
                      type="button"
                      onClick={() => handleSelectEquipment(equipo.id_equipo)}
                      disabled={equipo.ocupado}
                      className={`p-4 rounded-xl font-bold text-center transition-all duration-300 transform ${
                        equipo.ocupado
                          ? "bg-red-100 border-2 border-red-300 text-red-600 cursor-not-allowed opacity-50"
                          : selectedEquipment === equipo.id_equipo
                          ? "bg-[#a00000] text-white border-2 border-[#a00000] scale-105 shadow-lg"
                          : "bg-white border-2 border-[#767676] text-[#767676] hover:border-[#a00000]"
                      }`}
                    >
                      <div className="text-2xl font-black mb-1">
                        {equipo.codigo_equipo.split("-").pop()}
                      </div>
                      <div className="text-xs font-semibold">
                        {equipo.codigo_equipo}
                      </div>
                      <div className="text-xs mt-1 opacity-75">
                        {equipo.ocupado ? "Ocupado" : "Disponible"}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-4 text-center p-8 bg-gray-50 rounded-xl">
                    <p className="text-[#767676] font-semibold">
                      No hay equipos disponibles
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Estado del equipo */}
            <div>
              <label className="block text-sm font-black text-[#a00000] uppercase tracking-wider mb-4">
                Estado del equipo
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-[#767676] rounded-xl cursor-pointer hover:bg-[#767676]/5 transition-all">
                  <input
                    type="radio"
                    name="equipmentState"
                    value="operativo"
                    checked={equipmentState === "operativo"}
                    onChange={(e) => {
                      setEquipmentState(e.target.value as EstadoEquipo);
                      setProblemDescription(""); // Limpiar descripción si cambia a operativo
                    }}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-[#767676] font-bold">Operativo</span>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-[#767676] rounded-xl cursor-pointer hover:bg-[#767676]/5 transition-all">
                  <input
                    type="radio"
                    name="equipmentState"
                    value="con_fallas"
                    checked={equipmentState === "con_fallas"}
                    onChange={(e) =>
                      setEquipmentState(e.target.value as EstadoEquipo)
                    }
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-[#767676] font-bold">Con Fallas</span>
                </label>
              </div>
            </div>

            {/* Descripción del problema */}
            <div>
              <label className="block text-sm font-black text-[#a00000] uppercase tracking-wider mb-4">
                Describe el problema{" "}
                {equipmentState === "con_fallas" && (
                  <span className="text-red-600">*</span>
                )}
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe el problema que encontraste en el equipo (si aplica)..."
                disabled={equipmentState === "operativo"}
                className="w-full px-4 py-3 bg-white border-2 border-[#767676] rounded-xl text-[#767676] font-semibold focus:outline-none focus:border-[#a00000] focus:ring-2 focus:ring-[#a00000]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none h-28"
              />
              {equipmentState === "operativo" && (
                <p className="text-xs text-[#767676]/60 mt-2">
                  Este campo se activa solo si reportas fallas en el equipo
                </p>
              )}
              {equipmentState === "con_fallas" && (
                <p className="text-xs text-red-600 mt-2 font-semibold">
                  Debes describir el problema encontrado
                </p>
              )}
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={submitting || !selectedEquipment}
              className="w-full px-6 py-4 bg-[#a00000] text-white rounded-xl font-black uppercase tracking-wider hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? "Registrando..." : "Registrar Asistencia"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistroAsistencia;
