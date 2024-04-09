import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";

function ReportsPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataReport = async function () {
            try {
                const RESPONSE = await API_REPORTS.get("/");
                console.debug(RESPONSE)
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
        <TableReports data={data} />
    )
}

export default ReportsPage