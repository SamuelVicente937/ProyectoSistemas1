import api from "./axios";

interface FiltrosReportePersonal {
  fecha_inicio?: string;
  fecha_fin?: string;
  gestion?: number;
}

export const estudianteService = {
  async getReportePersonal(filtros?: FiltrosReportePersonal) {
    try {
      const params = new URLSearchParams();

      if (filtros?.gestion) {
        params.append('gestion', filtros.gestion.toString());
      }

      if (filtros?.fecha_inicio) {
        params.append('fecha_inicio', filtros.fecha_inicio);
      }

      if (filtros?.fecha_fin) {
        params.append('fecha_fin', filtros.fecha_fin);
      }

      const queryString = params.toString();
      const url = `/estudiante/reporte-personal${queryString ? `?${queryString}` : ''}`;

      console.log('🔍 URL Reporte Personal:', url);

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener reporte personal:', error);
      console.error('URL que falló:', error.config?.url);
      throw error;
    }
  },

  async downloadReportePersonalExcel(filtros?: FiltrosReportePersonal) {
    try {
      const params = new URLSearchParams();

      if (filtros?.gestion) {
        params.append('gestion', filtros.gestion.toString());
      }

      if (filtros?.fecha_inicio) {
        params.append('fecha_inicio', filtros.fecha_inicio);
      }

      if (filtros?.fecha_fin) {
        params.append('fecha_fin', filtros.fecha_fin);
      }

      const queryString = params.toString();
      const url = `/estudiante/reporte-personal/excel${queryString ? `?${queryString}` : ''}`;

      console.log('🔍 URL Excel Personal:', url);

      const response = await api.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const timestamp = Date.now();
      const filtroSuffix = filtros?.fecha_inicio || filtros?.fecha_fin ? '-filtrado' : '';
      link.download = `mi-reporte-asistencia${filtroSuffix}-${timestamp}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      console.error('Error al descargar Excel:', error);
      console.error('URL que falló:', error.config?.url);
      throw error;
    }
  },

  /**
   * 📊 OBTENER RESUMEN POR MATERIA
   */
  async getResumenPorMateria(gestion?: number) {
    try {
      const params = new URLSearchParams();
      if (gestion) {
        params.append('gestion', gestion.toString());
      }

      const queryString = params.toString();
      const url = `/estudiante/asistencias/resumen-materias${queryString ? `?${queryString}` : ''}`;

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener resumen por materia:', error);
      throw error;
    }
  },
};