import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import Sent from "../components/Sent";
import Loading from "../components/Loading";
import { useReportV } from "../context/Verified_context";

const columns = [
    {
        name: "Reportado",
        selector: row => row.reported_name,
    },
    {
        name: "Nombre",
        selector: row => row.name,
    },
    {
        name: "Email",
        selector: row => row.email,
    },
    {
        name: "Teléfono",
        selector: row => row.phone,
    },
    {
        name: "Fecha",
        selector: row => row.date_sighting.toString(),
    },
    {
        name: "Mensaje",
        selector: row => row.description,
    },
    {
        name: "Evidencia",
        selector: row => <button><a href={`http://localhost:4000/${row.photo}`} target="_blank" rel="noopener noreferrer">Ver foto</a></button>,
    },
]
const tableStylesR = {
    headCells: {
        style: {
            backgroundColor: "#A00000",
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
const tableStylesY = {
    headCells: {
        style: {
            backgroundColor: "#EC9F0B",
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

function ReportsPage() {
    const [dataRed, setDataRed] = useState([])
    const [dataYellow, setDataYellow] = useState([]);
    const [errorAPI, setErrorAPI] = useState("");
    const [errorData, setErrorData] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
    const [noticeReport, setNoticeReport] = useState([]);
    //console.log(user)

    useEffect(() => {
        async function dataReport() {
            try {
                const RESPONSE = await API_REPORTS.get("/");
                //console.debug(RESPONSE)
                if (RESPONSE.status != 200) {
                    console.warn(RESPONSE.response.data);
                    return false;
                }
                if (!Array.isArray(RESPONSE.data)) {
                    console.warn("No es un array");
                    return false;
                };
                //ESTO ES PARA MULTIPLICAR LAS FILAS, PARA PROBAR
                /*for (let index = 1; index < 20; index++) {
                    if (RESPONSE.data[index] == undefined) {
                        RESPONSE.data[index] = RESPONSE.data[0];
                    }
                }*/
                setErrorData(false);
                setErrorAPI("");
                setLoadingTable(false);
                return RESPONSE.data;

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

        async function separate(rowsData) {
            let rows = await rowsData;
            const tableR = [];
            const tableY = [];
            if (!rows) return console.log("No hay información para mostrar");
            console.debug(rows)
            if (!Array.isArray(rows)) return console.warn("No es un arreglo");
            console.table(rows);
            for (const row of rows) {
                if (row.date_sighting) {
                    //console.log(row.date_sighting)
                    let dateFormat = new Date(row.date_sighting);
                    if (dateFormat != "Invalid Date") row.date_sighting = dateFormat.toLocaleDateString("es-ES", { timeZone: 'UTC' });
                }
                if (row.state == "Reportado") {
                    tableR.push(row);
                } else if (row.state == "Desaparecido") {
                    tableY.push(row);
                }
            }
            setDataRed(tableR);
            setDataYellow(tableY);
        }


        const dataTables = dataReport();
        separate(dataTables)
    }, [])


    const { register_reportV } = useReportV();

    const registerSelect = async (data) =>{
        /*
        let data_v = await data.selectedRows
        for (const data_v_1 of data_v) {
            let date = data_v_1.date_sighting.split("/")
            let formatDate = new Date(date[2]+"/"+date[1]+"/"+date[0]);
            console.log("ASí queda la fecha")
            console.log(formatDate)
            const estructure = {
                reported_name: data_v_1.reported_name,
                date_sighting: formatDate,
                state: data_v_1.state,
                description: data_v_1.description,
                photo: data_v_1.photo
            }
            register_reportV(estructure)
        }
        */
    }

    const selectNotices = (notices) => {
        console.log(notices.selectedRows);
        setNoticeReport(notices.selectedRows);
    }

    return (
        <>
            {loadingTable && <Loading />}
            {!loadingTable && !errorData &&
                <TableReports data={dataRed} title="Reporte de Alertas Rojas" columns={columns} number={3} styles={tableStylesR} />
            }
            {!loadingTable && !errorData &&
                <TableReports data={dataYellow} title="Reporte de Alertas Amarillas" columns={columns} number={3} styles={tableStylesY} select={true} funDel={registerSelect} funSelDel={selectNotices} />
            }
            {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI} />}
        </>
    )
}

export default ReportsPage