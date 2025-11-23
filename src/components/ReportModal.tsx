import { AlertCircle, Clock, MessageCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

type ReportStatus = "new" | "in_review" | "resolved";
type ReportPriority = "low" | "medium" | "high" | "critical";
interface Report {
  id: number;
  labId: string;
  equipmentId: string;
  issue: string;
  reportedBy: string;
  reportedEmail: string;
  reportedDate: string;
  status: ReportStatus;
  priority: ReportPriority;
  description: string;
  reporter: Reporter;
  comments: Comment[];
  createdAt: Date;
}
interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}
interface Reporter {
  name: string;
  email: string;
  code: string;
}
interface ReportModalProps {
  report: Report;
  onClose: () => void;
  onStatusChange: (reportId: number, newStatus: ReportStatus) => void;
  onAddComment: (reportId: number, comment: string) => void;
}

const ReportModal = ({
  report,
  onClose,
  onStatusChange,
  onAddComment,
}: ReportModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [showCommentPrompt, setShowCommentPrompt] = useState(false);

  const handleStatusChange = (newStatus: ReportStatus) => {
    onStatusChange(report.id, newStatus);
    if (newStatus === "resolved") {
      setShowCommentPrompt(true);
    }
  };
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(report.id, newComment);
      setNewComment("");
      setShowCommentPrompt(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "new":
        return "bg-[#a00000]";
      case "in_review":
        return "bg-[#f59e0b]";
      case "resolved":
        return "bg-[#10b981]";
    }
  };

  const getStatusLabel = (status: ReportStatus) => {
    switch (status) {
      case "new":
        return "Nuevo";
      case "in_review":
        return "En Revisión";
      case "resolved":
        return "Resuelto";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in border-2 border-[#767676]">
          <div className="flex items-center justify-between px-7 py-4 border-b-2 border-[#767676]">
            <h2 className="text-3xl font-black text-[#a00000]">
              Detalles del Reporte
            </h2>
            <button
              onClick={onClose}
              className="text-[#767676] hover:text-[#a00000] transition-colors hover:scale-110 duration-300"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="p-6 space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto">
            <div className="bg-gray-50 border-2 border-[#767676] rounded-2xl p-5">
              <h3 className="text-xl font-black text-[#a00000] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#a00000]" />
                Información General
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#767676] font-semibold mb-1">
                    Laboratorio
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {report.labId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#767676] font-semibold mb-1">
                    Equipo
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {report.equipmentId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#767676] font-semibold mb-1">
                    Fecha de Reporte
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {report.reportedDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#767676] font-semibold mb-1">
                    Prioridad
                  </p>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider border-2 ${getPriorityColor(
                      report.priority
                    )}`}
                  >
                    {report.priority}
                  </span>
                </div>
              </div>
            </div>{" "}
            <div className="bg-gray-50 border-2 border-[#767676] rounded-2xl p-5">
              <h3 className="text-xl font-black text-[#a00000] mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#a00000]" />
                Problema Reportado
              </h3>
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {report.issue}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {report.description}
                </p>
              </div>
            </div>{" "}
            <div className="bg-gray-50 border-2 border-[#767676] rounded-2xl p-5">
              <h3 className="text-xl font-black text-[#a00000] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#a00000]" />
                Reportado por
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-[#767676] font-semibold">Nombre</p>
                  <p className="text-gray-900 font-medium">
                    {report.reporter.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#767676] font-semibold">Correo</p>
                  <p className="text-gray-900 font-medium">
                    {report.reporter.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#767676] font-semibold">
                    Código Estudiante
                  </p>
                  <p className="text-gray-900 font-medium">
                    {report.reporter.code}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border-2 border-[#767676] rounded-2xl p-5">
              <h3 className="text-xl font-black text-[#a00000] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#a00000]" />
                Estado Actual
              </h3>
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white uppercase tracking-wider ${getStatusColor(
                    report.status
                  )}`}
                >
                  {getStatusLabel(report.status)}
                </span>

                {report.status === "new" && (
                  <button
                    onClick={() => handleStatusChange("in_review")}
                    className="px-6 py-2 bg-[#a00000] text-white rounded-xl font-bold hover:bg-[#800000] transition-all duration-300 transform hover:scale-105"
                  >
                    Tomar Caso
                  </button>
                )}

                {report.status === "in_review" && (
                  <button
                    onClick={() => handleStatusChange("resolved")}
                    className="px-6 py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-[#059669] transition-all duration-300 transform hover:scale-105"
                  >
                    Marcar Resuelto
                  </button>
                )}
              </div>
            </div>

            {report.comments && report.comments.length > 0 && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Notas y Comentarios
                </h3>
                <div className="space-y-4">
                  {report.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-bold text-gray-900">
                          {comment.author}
                        </p>
                        <p className="text-xs text-[#767676]">{comment.date}</p>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {showCommentPrompt && (
              <div className="bg-gray-100 border-2 border-[#a00000] rounded-2xl p-5">
                <p className="text-sm font-bold text-[#a00000] mb-3">
                  Agregar comentario sobre la reparación (opcional):
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escriba un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                    className="flex-1 px-4 py-2 border border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a00000] text-sm"
                    autoFocus
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-[#a00000] text-white rounded-xl hover:bg-[#800000] transition-colors duration-300 transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {!showCommentPrompt && report.status !== "resolved" && (
              <button
                onClick={() => setShowCommentPrompt(true)}
                className="w-full px-6 py-3 border-2 border-[#767676] text-[#767676] rounded-xl font-semibold hover:bg-[#767676] hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Agregar Nota
              </button>
            )}
          </div>

          <div className="bg-white border-t-2 border-[#767676] px-7 py-4 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-[#767676] text-[#767676] rounded-xl font-bold hover:bg-[#a00000] hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
