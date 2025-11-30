// src/services/personalService.ts
import api from "./axios";

export interface Reporte {
  id: number;
  labId: string;
  equipmentId: string;
  issue: string;
  description: string;
  reportedBy: string;
  reportedEmail: string;
  reportedDate: string;
  status: "new" | "in_review" | "resolved";
  priority: "low" | "medium" | "high" | "critical";
  reporter: {
    nombre: string;
    correo: string;
    codigo: string;
  };
  comments: any[];
  createdAt: string;
}

export const personalService = {
  async getReportes() {
    const response = await api.get("/personal/reportes");
    return response.data;
  },

  async getEstadisticas() {
    const response = await api.get("/personal/estadisticas");
    return response.data;
  },

  async cambiarEstado(
    idReporte: number,
    estado: "pendiente" | "en_proceso" | "resuelto"
  ) {
    const response = await api.put(`/personal/reporte/${idReporte}/estado`, {
      estado,
    });
    return response.data;
  },

  async agregarComentario(idReporte: number, comentario: string) {
    const response = await api.post(
      `/personal/reporte/${idReporte}/comentario`,
      {
        comentario,
      }
    );
    return response.data;
  },

  async contarReportesNuevos() {
    const response = await api.get("/personal/reportes/nuevos/count");
    return response.data;
  },

  async getLaboratorios() {
    const response = await api.get("/personal/laboratorios");
    return response.data;
  },

  async getReporteUsoLaboratorios(filtros?: {
    id_laboratorio?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    id_asignatura?: number;
    turno?: "mañana" | "tarde";
  }) {
    const params = new URLSearchParams();

    if (filtros?.id_laboratorio)
      params.append("id_laboratorio", filtros.id_laboratorio.toString());
    if (filtros?.fecha_inicio)
      params.append("fecha_inicio", filtros.fecha_inicio);
    if (filtros?.fecha_fin) params.append("fecha_fin", filtros.fecha_fin);
    if (filtros?.id_asignatura)
      params.append("id_asignatura", filtros.id_asignatura.toString());
    if (filtros?.turno) params.append("turno", filtros.turno);

    const response = await api.get(
      `/personal/reportes/uso-laboratorios?${params.toString()}`
    );
    return response.data;
  },

  async descargarReporteUsoExcel(filtros?: {
    id_laboratorio?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    id_asignatura?: number;
    turno?: "mañana" | "tarde";
  }) {
    const params = new URLSearchParams();

    if (filtros?.id_laboratorio)
      params.append("id_laboratorio", filtros.id_laboratorio.toString());
    if (filtros?.fecha_inicio)
      params.append("fecha_inicio", filtros.fecha_inicio);
    if (filtros?.fecha_fin) params.append("fecha_fin", filtros.fecha_fin);
    if (filtros?.id_asignatura)
      params.append("id_asignatura", filtros.id_asignatura.toString());
    if (filtros?.turno) params.append("turno", filtros.turno);

    const response = await api.get(
      `/personal/reportes/uso-laboratorios/excel?${params.toString()}`,
      { responseType: "blob" }
    );

    // Descargar archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `reporte-uso-laboratorios-${new Date().getTime()}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
