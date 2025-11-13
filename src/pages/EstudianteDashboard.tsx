import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  codigo_usuario: string;
  correo: string;
  tipo_usuario: 'docente' | 'estudiante' | 'personal';
}

export default function DocenteDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData || userData.tipo_usuario !== 'estudiante') {
      navigate('/login');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    navigate('/login');
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard Estudiante</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Bienvenido, {user.nombres} {user.apellidos}
          </h2>
          <p className="text-gray-600">Código: {user.codigo_usuario}</p>
          <p className="text-gray-600">Correo: {user.correo}</p>
          <p className="text-gray-600">Tipo: {user.tipo_usuario}</p>
        </div>
      </div>
    </div>
  );
}