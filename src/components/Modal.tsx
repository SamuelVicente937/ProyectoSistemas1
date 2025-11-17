import { Check, CheckCircle, Copy, Share2, X } from "lucide-react";
import { useState, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  isSuccess?: boolean;
  successMessage?: string;
  enlaceGenerado?: {
    token: string;
    materia: string;
    grupo: string;
    horario: string;
    dia: string;
    laboratorio: string;
    laboratorio_asignado?: {
      codigo_lab: string;
      nombre_lab: string;
    } | null;
    fecha_expiracion: string;
  } | null;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  cancelText = "Cancel",
  children,
  isSuccess = false,
  successMessage = "Completado correctamente",
  enlaceGenerado = null,
}: ModalProps) => {
  const [copied, setCopied] = useState(false);

  const copiarEnlace = () => {
    if (enlaceGenerado) {
      const enlaceCompleto = `${window.location.origin}/asistencia/${enlaceGenerado.token}`;
      navigator.clipboard.writeText(enlaceCompleto);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const compartirTeams = () => {
    if (enlaceGenerado) {
      const enlaceCompleto = `${window.location.origin}/asistencia/${enlaceGenerado.token}`;
      const mensaje = `REGISTRO DE ASISTENCIA
      Materia: ${enlaceGenerado.materia}
      Grupo: ${enlaceGenerado.grupo}
      Horario: ${enlaceGenerado.dia} ${enlaceGenerado.horario}
      Lab: ${enlaceGenerado.laboratorio}
      👉 Registra tu asistencia aquí:
      ${enlaceCompleto}
      ⏰ El enlace expira: ${new Date(
        enlaceGenerado.fecha_expiracion
      ).toLocaleString("es-BO")}`;
      const teamsUrl = `msteams://teams.microsoft.com/l/chat/0/0?message=${encodeURIComponent(
        mensaje
      )}`;
      window.open(teamsUrl, "_blank");
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg transform transition-all duration-300 scale-100 border-2 border-[#767676]">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="mb-5 animate-bounce">
              <CheckCircle className="w-16 h-16 text-[#a00000]" />
            </div>
            <h2 className="text-3xl font-black text-[#a00000] mb-3 text-center">
              {successMessage}
            </h2>
            <p className="text-[#767676] text-lg font-semibold mb-8 text-center">
              El enlace de asistencia ha sido generado exitosamente
            </p>

            {enlaceGenerado && (
              <div className="w-full space-y-4 mb-6">
                <div className="bg-gray-50 border-2 border-[#767676] rounded-lg p-4">
                  <p className="text-sm text-[#767676] font-bold mb-2">
                    ENLACE GENERADO
                  </p>
                  <code className="text-xs text-[#a00000] break-all block font-mono">
                    {`${window.location.origin}/asistencia/${enlaceGenerado.token}`}
                  </code>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copiarEnlace}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition text-sm ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-[#767676] text-white hover:bg-[#5a5a5a]"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar
                      </>
                    )}
                  </button>
                  <button
                    onClick={compartirTeams}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#a00000]/90 text-white rounded-lg font-bold hover:bg-[#a00000]/80 transition text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Teams
                  </button>
                </div>

                <div className="bg-red-50 border-2 border-[#a00000] rounded-lg p-4">
                  <p className="font-bold text-[#a00000] mb-2 text-sm">
                    Información:
                  </p>
                  <ul className="space-y-1 text-xs text-[#767676]">
                    <li>
                      • <strong>Materia:</strong> {enlaceGenerado.materia}
                    </li>
                    <li>
                      • <strong>Grupo:</strong> {enlaceGenerado.grupo}
                    </li>
                    <li>
                      • <strong>Horario:</strong> {enlaceGenerado.dia}{" "}
                      {enlaceGenerado.horario}
                    </li>
                    <li>
                      • <strong>Laboratorio:</strong>{" "}
                      {enlaceGenerado.laboratorio}
                    </li>
                  </ul>
                  <p className="mt-2 text-[#a00000] font-bold text-xs">
                    Expira:{" "}
                    {new Date(enlaceGenerado.fecha_expiracion).toLocaleString(
                      "es-BO"
                    )}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#8a0000] transition-all duration-300 transform hover:scale-105"
            >
              Aceptar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-7 py-4 border-b-2 border-[#767676]">
              <h2 className="text-3xl font-black text-[#a00000]">{title}</h2>
              <button
                onClick={onClose}
                className="text-[#767676] hover:text-[#a00000] transition-colors hover:scale-110 duration-300"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className=" flex flex-col gap-3 px-5 pb-6">
              <p className="text-[#767676] text-lg font-semibold mb-6">
                {message}
              </p>
              {children}

              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-[#767676] text-[#767676] rounded-xl font-bold hover:bg-[#767676] hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {cancelText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
