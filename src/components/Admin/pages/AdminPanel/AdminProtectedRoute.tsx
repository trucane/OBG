import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../utils/Auth/AuthContext";

export const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {currentUser} = useAuth();


    return <>
        { 
            currentUser?.role.includes('admin') ? children : <Navigate to={'/'}/>
        }
    </>
};