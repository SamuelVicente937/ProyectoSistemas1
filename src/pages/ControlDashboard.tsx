import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import {
  DashboardHeader,
  Footer,
  Navbar,
  ReportModal,
  StatCard,
} from "../components";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  GraduationCap,
  Search,
} from "lucide-react";
interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  tipo_usuario: "docente" | "estudiante" | "personal";
}
interface Reporter {
  nombre: string;
  codigo: string;
  correo: string;
}

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

const initialReports: Report[] = [
  {
    id: 1,
    labId: "LAB-201",
    equipmentId: "PC-12",
    issue: "Teclado con teclas pegajosas",
    reportedBy: "Juan Pérez",
    reportedEmail: "juan.perez@test.univalle",
    reportedDate: "2025-11-22 14:30",
    status: "new",
    priority: "high",
    description: "Las teclas 'a', 's', 'd' no responden correctamente.",
    reporter: {
      nombre: "Juan Pérez Romero",
      correo: "juan.perez@test.univalle",
      codigo: "12345",
    },
    comments: [],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    labId: "LAB-205",
    equipmentId: "PC-08",
    issue: "Monitor sin señal",
    reportedBy: "María López",
    reportedEmail: "maria.lopez@test.univalle",
    reportedDate: "2025-11-22 10:15",
    status: "new",
    priority: "critical",
    description: "Monitor encendido pero sin imagen.",
    reporter: {
      nombre: "María López García",
      correo: "maria.lopez@test.univalle",
      codigo: "67890",
    },
    comments: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    labId: "LAB-101",
    equipmentId: "PC-03",
    issue: "Mouse defectuoso",
    reportedBy: "Carlos Rodriguez",
    reportedEmail: "carlos.rodriguez@test.univalle",
    reportedDate: "2025-11-21 16:45",
    status: "in_review",
    priority: "medium",
    description: "Cursor errático, posible problema de driver.",
    reporter: {
      nombre: "Carlos Rodriguez Muñoz",
      correo: "carlos.rodriguez@test.univalle",
      codigo: "11111",
    },
    comments: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export default function DocenteDashboard() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | ReportStatus>("all");
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData || userData.tipo_usuario !== "personal") {
      navigate("/login");
      return;
    }
    setUser(userData);
    loadData();

    const interval = setInterval(() => {
      console.log("🔄 Auto-refresh reportes...");
      loadData(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      // TODO: Reemplazar con llamada API real
      // const data = await personalService.getReportes();
      // setReports(data.reportes);

      console.log("📊 Cargando reportes...");
      // Por ahora usa los datos iniciales
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const stats = {
    nuevos: reports.filter((r) => r.status === "new").length,
    en_revision: reports.filter((r) => r.status === "in_review").length,
    resueltos: reports.filter((r) => r.status === "resolved").length,
  };

  const handleStatusChange = (reportId: number, newStatus: ReportStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleAddComment = (reportId: number, commentText: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: user ? `${user.nombres} ${user.apellidos}` : "Usuario",
      date: new Date().toLocaleString("es-BO"),
      content: commentText,
    };

    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, comments: [...report.comments, newComment] }
          : report
      )
    );

    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.labId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.equipmentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || report.status === filterStatus;

    return matchesSearch && matchesFilter;
  });
  const getRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Justo ahora";
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    return `Hace ${days} día${days > 1 ? "s" : ""}`;
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "new":
        return "bg-[#a00000]";
      case "in_review":
        return "bg-[#a00000]";
      case "resolved":
        return "bg-[#a00000]";
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
              icon={AlertCircle}
              title="Reportes nuevos"
              value={stats.nuevos}
              subtitle="Sin atender"
              variant="primary"
            />
            <StatCard
              icon={Clock}
              title="En revisión"
              value={stats.en_revision}
              subtitle="Atendiendo"
              variant="secondary"
            />
            <StatCard
              icon={CheckCircle2}
              title="Resueltos"
              value={stats.resueltos}
              subtitle="Completados"
              variant="warning"
            />
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-[#a00000]">
                Reportes Recientes (
                {reports.filter((r) => r.status === "new").length} nuevos)
              </h2>
            </div>
            {reports
              .filter((r) => r.status === "new")
              .slice(0, 5)
              .map((report) => (
                <div
                  key={report.id}
                  className="relative bg-gray-50 rounded-xl p-8 border-2 border-[#a00000] hover:shadow-md transition-all"
                >
                  <button
                    className="absolute top-3 right-3 text-sm font-semibold px-3 py-1.5 rounded-full text-white bg-[#a00000] flex items-center gap-2 hover:bg-[#800000] transition-colors"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="h-4 w-4" />
                    Ver Detalle
                  </button>

                  <h3 className="text-gray-900 text-lg font-bold mb-3">
                    {report.issue}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-semibold">{report.labId}</span>
                    <span>•</span>
                    <span>{report.equipmentId}</span>
                    <span>•</span>
                    <span className="text-[#a00000] font-bold">
                      {getRelativeTime(report.createdAt)}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">
                    Reportado por: <strong>{report.reportedBy}</strong>
                  </p>
                </div>
              ))}
            {reports.filter((r) => r.status === "new").length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">
                  ¡Todo al día! No hay reportes nuevos
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#767676] p-8 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-[#a00000]">
                Buscar/Filtrar Reportes
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-500 px-6 py-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#767676] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por problema, lab, equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a00000] text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="text-[#767676] w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value as "all" | ReportStatus)
                    }
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a00000] text-sm font-medium"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="new">Nuevos</option>
                    <option value="in_review">En Revisión</option>
                    <option value="resolved">Resueltos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-500">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Lab
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Equipo
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Problema
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Reportado por
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Estado
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-[#a00000] uppercase tracking-widest">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className="font-bold text-gray-900">
                          {report.labId}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">
                          {report.equipmentId}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-gray-900 font-medium line-clamp-2">
                          {report.issue}
                        </p>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div>
                          <p className="text-gray-900 font-medium text-sm">
                            {report.reportedBy}
                          </p>
                          <p className="text-[#767676] text-xs">
                            {report.reportedEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {getStatusLabel(report.status)}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#a00000] text-white rounded-lg text-xs font-bold hover:bg-[#800000] transition-colors duration-300 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onAddComment={handleAddComment}
        />
      )}
      <Footer variant="simple" />
    </div>
  );
}
