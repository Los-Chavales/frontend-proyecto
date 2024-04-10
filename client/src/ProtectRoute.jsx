import { useAuth } from "./context/Auth_context";
import { Navigate, Outlet } from "react-router-dom"

function ProtectRoute() {
    const { user, isAuth, loading } = useAuth();
    //console.log(loading, isAuth)
    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAuth) return <Navigate to="/login" replace />

    return <Outlet />;
}

export default ProtectRoute;