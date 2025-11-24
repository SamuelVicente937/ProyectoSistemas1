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

  async cambiarEstado(idReporte: number, estado: "pendiente" | "en_proceso" | "resuelto") {
    const response = await api.put(`/personal/reporte/${idReporte}/estado`, {
      estado,
    });
    return response.data;
  },

  async agregarComentario(idReporte: number, comentario: string) {
    const response = await api.post(`/personal/reporte/${idReporte}/comentario`, {
      comentario,
    });
    return response.data;
  },

  async contarReportesNuevos() {
    const response = await api.get("/personal/reportes/nuevos/count");
    return response.data;
  },
};