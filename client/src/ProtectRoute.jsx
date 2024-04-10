import { useAuth } from "./context/Auth_context";
import { Navigate, Outlet } from "react-router-dom"
import Loading from "./components/Loading";

function ProtectRoute() {
    const { user, isAuth, loading } = useAuth();
    //console.log(loading, isAuth)
    if (loading) return <Loading />
    if (!loading && !isAuth) return <Navigate to="/login" replace />

    return <Outlet />;
}

export default ProtectRoute;