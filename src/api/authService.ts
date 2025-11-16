// src/api/authService.ts
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
      
      // Guardar token y usuario
      localStorage.setItem('token', response.data.access_token);
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
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar siempre, incluso si falla la petición
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getMe(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>('/me');
      return response.data.user;
    } catch (error) {
      // Si falla, limpiar datos locales
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};