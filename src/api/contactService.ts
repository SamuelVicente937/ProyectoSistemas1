import api from './axios';

export interface ContactFormData {
  nombre: string;
  correo: string;
  tipo_problema: string;
  descripcion: string;
}

export interface ContactResponse {
  message: string;
  data?: any;
}

export const contactService = {
  sendContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    try {
      const response = await api.post('/contact', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error de respuesta del servidor
        throw new Error(error.response.data.message || 'Error al enviar el mensaje');
      } else if (error.request) {
        // No hubo respuesta del servidor
        throw new Error('No se pudo conectar con el servidor');
      } else {
        // Error en la configuración de la petición
        throw new Error('Error al procesar la solicitud');
      }
    }
  }
};