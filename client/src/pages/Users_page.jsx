import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_SERVER } from "../utils/api/conexion_server";
import { useAuth } from "../context/Auth_context";
import { Link } from "react-router-dom";
import Sent from "../components/Sent";
import Loading from "../components/Loading";

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
    },
    {
        name: "Tipo",
        selector: row => row.role,
    }
]

const tableStyles = {
    headCells: {
        style: {
            backgroundColor: "gray",
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 'bold'
        }
    },
    rows: {
        style: {
            fontSize: '15px',
        }
    }
}

function UsersPage() {
    const [dataUsers, setDataUsers] = useState([]);
    const [errorAPI, setErrorAPI] = useState("");
    const [errorData, setErrorData] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
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
                        if(dateFormat != "Invalid Date") row.createdAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
                    }
                    if (row.updatedAt) {
                        let dateFormat = new Date(row.updatedAt);
                        if(dateFormat != "Invalid Date") row.updatedAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
                    }
                }
                setErrorData(false);
                setErrorAPI("");
                setLoadingTable(false);
                return setDataUsers(RESPONSE.data);

            } catch (error) {
                let menError = error.message;
                if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
                if (!menError) menError = "Error al obtener los datos del servidor";
                console.error('Error al obtener los datos:', menError);
                setErrorData(true);
                setErrorAPI(menError);
                setLoadingTable(false);
                return false;
            }
        }
        dataReport();
    }, [])


    return (
        <>
            {loadingTable && <Loading />}
            {!loadingTable && !errorData && <TableReports data={dataUsers} title="Usuarios Registrados" columns={columns} styles={tableStyles} />}
            {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI}/>}
        </>
    )
}

export default UsersPage