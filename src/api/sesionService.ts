import api from "./axios";

export const sesionService = {
  async getMaterias() {
    const response = await api.get("/docente/materias");
    return response.data;
  },

  async getHorarios(idAsignatura: number) {
    const response = await api.get(
      `/docente/materias/${idAsignatura}/horarios`
    );
    return response.data;
  },

  async getLaboratorios() {
    const response = await api.get("/laboratorios");
    return response.data;
  },

  async generarEnlace(data: {
    id_horario: number;
    id_lab: number;
    observaciones?: string;
  }) {
    const response = await api.post("/docente/sesion/generar-enlace", data);
    return response.data;
  },

  async getSesionesActivas() {
    const response = await api.get("/docente/sesiones-activas");
    return response.data;
  },

  async getEstadisticas() {
    const response = await api.get("/docente/estadisticas");
    return response.data;
  },

  async cerrarSesion(idSesion: number) {
    const response = await api.put(`/docente/sesion/${idSesion}/cerrar`);
    return response.data;
  },

  async obtenerSesionPorToken(token: string) {
    const response = await api.get(`/sesion/${token}`);
    return response.data;
  },

  async getListaAsistencia(idSesion: number) {
    const response = await api.get(
      `/docente/sesion/${idSesion}/lista-asistencia`
    );
    return response.data;
  },

  async downloadPDFList(idSesion: number) {
    try {
      const response = await api.get(`/docente/sesion/${idSesion}/lista-pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `lista-asistencia-${idSesion}-${Date.now()}.pdf`
      );

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error: any) {
      console.error("Error downloading PDF:", error);
      throw error;
    }
  },

  async downloadExcelList(idSesion: number) {
    try {
      const response = await api.get(
        `/docente/sesion/${idSesion}/lista-excel`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `lista-asistencia-${idSesion}-${Date.now()}.xlsx`
      );

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error: any) {
      console.error("Error al descargar Excel:", error);
      throw error;
    }
  },
};
