// src/services/asistenciaService.ts
import api from "./axios";

export interface RegistrarAsistenciaPayload {
  id_sesion: number;
  id_equipo: number;
  observaciones?: string;
}

export interface AsistenciaRegistrada {
  id_asistencia: number;
  equipo: string;
  hora_registro: string;
  reporte_creado: boolean;
}

export interface MiAsistenciaResponse {
  registrado: boolean;
  message?: string;
  asistencia?: {
    id_asistencia: number;
    equipo: string;
    hora_registro: string;
    observaciones: string | null;
    puede_editar: boolean;
  };
}

export const asistenciaService = {

  async registrarAsistencia(payload: RegistrarAsistenciaPayload) {
    const response = await api.post<{
      message: string;
      asistencia: AsistenciaRegistrada;
    }>("/sesion/registrar-asistencia", payload);
    return response.data;
  },
  /**
   * Verificar si ya registré asistencia en esta sesión
   */
  async verificarMiAsistencia(token: string) {
    const response = await api.get<MiAsistenciaResponse>(
      `/sesion/${token}/mi-asistencia`
    );
    return response.data;
  },

  /**
   * Obtener historial de mis asistencias
   */
  async obtenerMisAsistencias(gestion?: number) {
    const params = gestion ? { gestion } : {};
    const response = await api.get("/estudiante/asistencias", { params });
    return response.data;
  },

  /**
   * Obtener detalle de una asistencia específica
   */
  async obtenerDetalleAsistencia(idAsistencia: number) {
    const response = await api.get(`/estudiante/asistencia/${idAsistencia}`);
    return response.data;
  },

  /**
   * Actualizar observación de mi asistencia
   */
  async actualizarObservacion(idAsistencia: number, observaciones: string) {
    const response = await api.put(
      `/estudiante/asistencia/${idAsistencia}/observacion`,
      { observaciones }
    );
    return response.data;
  },

  /**
   * Cancelar mi asistencia (solo primeros 5 minutos)
   */
  async cancelarAsistencia(idAsistencia: number) {
    const response = await api.delete(`/estudiante/asistencia/${idAsistencia}`);
    return response.data;
  },

  /**
   * Obtener resumen de asistencias por materia
   */
  async obtenerResumenPorMateria(gestion?: number) {
    const params = gestion ? { gestion } : {};
    const response = await api.get("/estudiante/asistencias/resumen-materias", {
      params,
    });
    return response.data;
  }
};