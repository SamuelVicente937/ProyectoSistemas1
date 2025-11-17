import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../api/authService";

interface ProtectedRouteProps{
    children: React.ReactNode;
    allowedRoles?: Array<('docente' | 'estudiante' | 'personal')>;
}

const ProtectedRoute = ({children, allowedRoles} : ProtectedRouteProps) => {
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getUser();

    if (!isAuthenticated) {
        localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
        return <Navigate to="/login" state={{from:location}} replace/>;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.tipo_usuario)) {
        return <Navigate to="/unauthorized" replace/>
    }
    return <>{children}</>
}
export default ProtectedRoute;