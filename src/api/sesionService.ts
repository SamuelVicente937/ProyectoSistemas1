import api from "./axios";


export const sesionService = {

  async getMaterias() {
    const response = await api.get('/docente/materias');
    return response.data;
  },


  async getHorarios(idAsignatura: number) {
    const response = await api.get(`/docente/materias/${idAsignatura}/horarios`);
    return response.data;
  },

  async getLaboratorios() {
    const response = await api.get('/laboratorios');
    return response.data;
  },

  async generarEnlace(data: {
    id_horario: number;
    id_lab: number;
    observaciones?: string;
  }) {
    const response = await api.post('/sesiones/generar-enlace', data);
    return response.data;
  },

  async getSesionesActivas() {
    const response = await api.get('/docente/sesiones-activas');
    return response.data;
  },

  async getEstadisticas() {
    const response = await api.get('/docente/estadisticas');
    return response.data;
  },

  async cerrarSesion(idSesion: number) {
    const response = await api.put(`/sesiones/${idSesion}/cerrar`);
    return response.data;
  }
};