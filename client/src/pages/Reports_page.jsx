import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import { useAuth } from "../context/Auth_context";
import { Link } from "react-router-dom";

function ReportsPage() {
    const [data, setData] = useState([]);

    const { user, logout } = useAuth();
    //console.log(user)

    useEffect(() => {
        const dataReport = async function () {
            try {
                const RESPONSE = await API_REPORTS.get("/");
                console.log(RESPONSE)
                //console.debug(RESPONSE)
                if (RESPONSE.status != 200) {
                    console.warn(RESPONSE.response.data);
                    return setData([]);
                }
                if (!Array.isArray(RESPONSE.data)) return setData([]);
                //ESTO ES PARA MULTIPLICAR LAS FILAS, PARA PROBAR
                for (let index = 1; index < 20; index++) {
                    RESPONSE.data[index] = RESPONSE.data[0];
                }

                return setData(RESPONSE.data);

            } catch (error) {
                let menError = error.message;
                if (error.response) menError = error.response.data.message;
                console.error('Error al obtener los datos:', menError);
                return setData([]);
            }
        }
        dataReport();
    }, [])


    return (

        <>
            <div>
                <p>Hola, {user.username}</p>
                <Link to="/" onClick={() => { logout() }}><button>Cerrar Sesión</button></Link>
            </div>
            <TableReports data={data} />
        </>
    )
}

export default ReportsPage