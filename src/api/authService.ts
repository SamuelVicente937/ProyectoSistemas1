import api from './axios';
import { AxiosError } from 'axios';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  correo_institucional: string;
  tipo_usuario: 'docente' | 'estudiante' | 'personal';
}

interface LoginResponse {
  access_token: string;
  user: User;
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export const authService = {
  async login(correo_institucional: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/login', {
        correo_institucional,
        password,
      });
      
      // Guardar token en localStorage
      localStorage.setItem('auth_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },

  async getMe(): Promise<User> {
    const response = await api.get<{ user: User }>('/me');
    return response.data.user;
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};