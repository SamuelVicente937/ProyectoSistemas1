import { X } from "lucide-react";

interface Estudiante {
  codigo: string;
  nombres: string;
  apellidos: string;
  nombre_completo: string;
}

interface Asistencia {
  id_asistencia: number;
  estudiante: Estudiante;
  equipo: string;
  hora_registro: string;
  observaciones: string | null;
}

interface Sesion {
  id_sesion: number;
  materia: string;
  grupo: string;
  horario: string;
  dia: string;
  fecha: string;
  laboratorio: string;
  docente: string;
}

interface ListaAsistenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  sesion: Sesion | null;
  asistencias: Asistencia[];
  totalEstudiantes: number;
  onDescargarPDF?: () => void;
  onDescargarExcel?: () => void;
}

const ListaAsistenciaModal = ({
  isOpen,
  onClose,
  sesion,
  asistencias,
  totalEstudiantes,
  onDescargarPDF,
  onDescargarExcel,
}: ListaAsistenciaModalProps) => {
  if (!isOpen || !sesion) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border-2 border-[#767676]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b-2 border-[#767676]">
          <h2 className="text-3xl font-black text-[#a00000]">
            Lista de Asistencia
          </h2>
          <button
            onClick={onClose}
            className="text-[#767676] hover:text-[#a00000] transition-colors hover:scale-110 duration-300"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Info de la sesión */}
        <div className="bg-gradient-to-r from-[#767676] to-[#a00000] p-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-90 font-semibold">MATERIA</p>
              <p className="text-lg md:text-xl font-black">{sesion.materia}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 font-semibold">GRUPO</p>
              <p className="text-lg md:text-xl font-black">{sesion.grupo}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 font-semibold">FECHA</p>
              <p className="text-lg md:text-xl font-black">{sesion.fecha}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 font-semibold">LABORATORIO</p>
              <p className="text-lg md:text-xl font-black">
                {sesion.laboratorio}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 font-semibold">HORARIO</p>
                <p className="text-lg font-black">
                  {sesion.dia} {sesion.horario}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 font-semibold">
                  ESTUDIANTES PRESENTES
                </p>
                <p className="text-4xl font-black">{totalEstudiantes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de asistencias */}
        <div className="p-6 overflow-y-auto max-h-[400px]">
          {asistencias.length > 0 ? (
            <table className="w-full border-2 border-[#767676] rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Nro
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Equipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#a00000] uppercase tracking-wider">
                    Observaciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {asistencias.map((asistencia, index) => (
                  <tr
                    key={asistencia.id_asistencia}
                    className="hover:bg-gradient-to-r hover:from-red-50 hover:to-white transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {asistencia.estudiante.codigo}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {asistencia.estudiante.nombre_completo}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#a00000]">
                      {asistencia.equipo}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {asistencia.hora_registro}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {asistencia.observaciones || (
                        <span className="text-gray-400 italic">
                          Sin observaciones
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-semibold">
                No hay asistencias registradas aún
              </p>
            </div>
          )}
        </div>

        {/* Botones de descarga */}
        <div className="flex gap-4 p-6 border-t-2 border-[#767676]">
          <button
            onClick={onDescargarPDF}
            disabled={asistencias.length === 0}
            className="flex-1 px-6 py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Descargar PDF
          </button>
          <button
            onClick={onDescargarExcel}
            disabled={asistencias.length === 0}
            className="flex-1 px-6 py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Descargar Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListaAsistenciaModal;