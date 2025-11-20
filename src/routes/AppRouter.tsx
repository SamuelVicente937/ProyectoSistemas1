import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing, Login } from "../pages";
import DocenteDashboard from "../pages/DocenteDashboard";
import EstudianteDashboard from "../pages/EstudianteDashboard";
import ControlDashboard from "../pages/ControlDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RegistroAsistencia from "../pages/RegistroAsistencia";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/docente/dashboard"
          element={
            <ProtectedRoute allowedRoles={['docente']}>
              <DocenteDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/estudiante/dashboard"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
              <EstudianteDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/control/dashboard"
          element={
            <ProtectedRoute allowedRoles={['personal']}>
              <ControlDashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/asistencia/:token"
          element={
            <ProtectedRoute allowedRoles={['estudiante']}>
               <RegistroAsistencia /> 
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<div>No autorizado</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;