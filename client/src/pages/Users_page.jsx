import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_SERVER } from "../utils/api/conexion_server";
import { useAuth } from "../context/Auth_context";
import { Link } from "react-router-dom";
import Sent from "../components/Sent";

const columns = [
    {
        name: "Nombre de usuario",
        selector: row => row.username,
    },
    {
        name: "Email",
        selector: row => row.email,
    },
    {
        name: "Fecha de Creación",
        selector: row => row.createdAt.toString(),
    },
    {
        name: "Última actualización",
        selector: row => row.updatedAt.toString(),
    }
]

function UsersPage() {
    const [dataUsers, setDataUsers] = useState([]);
    const { user, logout } = useAuth();
    const [errorAPI, setErrorAPI] = useState("");
    const [errorData, setErrorData] = useState(true);
    //console.log(user)

    useEffect(() => {
        async function dataReport() {
            try {
                const RESPONSE = await API_SERVER.get("/users");
                //console.debug(RESPONSE)
                if (RESPONSE.status != 200) {
                    console.warn(RESPONSE.response.data);
                    return false;
                }
                if (!Array.isArray(RESPONSE.data)) {
                    console.warn("No es un array");
                    return false;
                }
                for (const row of RESPONSE.data) {
                    if (row.createdAt) {
                        let dateFormat = new Date(row.createdAt);
                        row.createdAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
                    }
                    if (row.updatedAt) {
                        let dateFormat = new Date(row.updatedAt);
                        row.updatedAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
                    }
                }
                setErrorData(false);
                setErrorAPI("");
                return setDataUsers(RESPONSE.data);

            } catch (error) {
                let menError = error.message;
                if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
                if (!menError) menError = "Error al obtener los datos del servidor";
                console.error('Error al obtener los datos:', menError);
                setErrorData(true);
                setErrorAPI(menError);
                return false;
            }
        }
        dataReport();
    }, [])


    return (
        <>
            <div className="logOut">
                <p>Hola, {user.username}</p>
                <Link to="/" onClick={() => { logout() }}><button>Cerrar Sesión</button></Link>
            </div>
            {!errorData && <TableReports data={dataUsers} title="Usuarios Registrados" columns={columns} />}
            {errorData && <Sent title="Ha ocurrido un error" par={errorAPI}/>}
        </>
    )
}

export default UsersPage