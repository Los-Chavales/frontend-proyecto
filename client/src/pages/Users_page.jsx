import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_SERVER } from "../utils/api/conexion_server";
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
    const [usersSel, setUsersSel] = useState([]);
    //console.log(user)

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
                    if (dateFormat != "Invalid Date") row.createdAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
                }
                if (row.updatedAt) {
                    let dateFormat = new Date(row.updatedAt);
                    if (dateFormat != "Invalid Date") row.updatedAt = dateFormat.toLocaleString("es-ES", { timeZone: 'UTC' });
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

    useEffect(() => {
        dataReport();
    }, [])


    const updateUsers = async () => {
        console.log('Actualizar', usersSel);
        const usersSelec = usersSel;
        console.log("tabla que llega")
        console.table(usersSelec) // llega tal cual 
        //FALTA IGNORAR ADMINS
        usersSelec.forEach((row, index) => {
            let resume = true;
            if (resume && row.role == 'user') {
                row.role = 'supervisor';
                resume = false;
            }
            if (resume && row.role == 'supervisor') {
                row.role = 'user';
                resume = false;
            }
        });
        console.log("tabla con estados actualizados");
        console.table(usersSelec);
        if (usersSelec.length < 1) return console.debug("Vacío", usersSelec);

        if (usersSelec.length < 1) return console.warn('No hay datos para actualizar');//COLOCAR EN LA PÁGINA 
        
        try {
            const RESPONSE = await API_SERVER.post("/update", usersSel);
            //console.log(RESPONSE);
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.data);
                return false;
            }
            setLoadingTable(true);
            dataReport();
            return
        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error al borrar";
            console.error('Error al eliminar:', menError);
            setErrorData(true);
            setErrorAPI(menError);
            setLoadingTable(false);
            return false;
        }
        
    }
    const deleteUsers = async () => {
        console.log('Borrar', usersSel);
        try {
            const RESPONSE = await API_SERVER.post("/delete", usersSel);
            //console.log(RESPONSE);
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.data);
                return false;
            }
            setLoadingTable(true);
            dataReport();
            return
        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error al borrar";
            console.error('Error al eliminar:', menError);
            setErrorData(true);
            setErrorAPI(menError);
            setLoadingTable(false);
            return false;
        }
    }
    const selectUsers = (usersD) => {
        //console.log(usersD.selectedRows);
        setUsersSel(usersD.selectedRows);
    }

    return (
        <>
            {loadingTable && <Loading />}
            {!loadingTable && !errorData && <TableReports data={dataUsers} title="Usuarios Registrados" columns={columns} styles={tableStyles} select={true} funSelDel={selectUsers} funDel={[deleteUsers, updateUsers]} listType={["Eliminar", "Cambiar Rol"]} />}
            {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI} />}
        </>
    )
}

export default UsersPage