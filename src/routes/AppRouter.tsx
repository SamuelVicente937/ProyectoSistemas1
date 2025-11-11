import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Landing, Login } from "../pages";
import { authService } from "../api/authService";
import DocenteDashboard from "../pages/DocenteDashboard";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: Array<'docente' | 'estudiante' | 'personal'>;
}

// function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
//   const user = authService.getUser();
  
//   if (!authService.isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }
  
//   if (allowedTypes && !allowedTypes.includes(user?.tipo_usuario)) {
//     return <Navigate to="/login" />;
//   }
  
//   return <>{children}</>;
// }

function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const user = authService.getUser();

  // Si no está autenticado, redirige
  if (!authService.isAuthenticated() || !user) {
    return <Navigate to="/login" />;
  }

  // Si hay tipos permitidos y el usuario no está en ellos, redirige
  if (allowedTypes && !allowedTypes.includes(user.tipo_usuario)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const Router = () =>{
    return(
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/docente/dashboard"
          element={
            <ProtectedRoute allowedTypes={['docente']}>
              <DocenteDashboard />
            </ProtectedRoute>
          }
        />
{/*         
        <Route
          path="/estudiante/dashboard"
          element={
            <ProtectedRoute allowedTypes={['estudiante']}>
              <EstudianteDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/control/dashboard"
          element={
            <ProtectedRoute allowedTypes={['personal']}>
              <ControlDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
    )
}
export default Router;