import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import Sent from "../components/Sent";
import Loading from "../components/Loading";
import sort_dates from "../utils/functions/sort_dates";

/* Aún está incompleta */

const columns = [
  {
      name: "Nombre",
      selector: row => row.reported_name,
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

function CoincidenceReportsFree() {
  const [dataRed, setDataRed] = useState([])
  const [dataYellow, setDataYellow] = useState([]);

  const [errorAPI, setErrorAPI] = useState("");
  const [errorData, setErrorData] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

      //Para obtener los datos del servidor
      async function dataReport() {
        try {
            const RESPONSE = await API_REPORTS.get("/coincidence_reports_free");
            //console.debug(RESPONSE)
            if (RESPONSE.status != 200) {
                console.warn(RESPONSE.response.data);
                return false;
            }
            if (!Array.isArray(RESPONSE.data)) {
                console.warn("No es un array");
                return false;
            };
            setErrorData(false);
            setErrorAPI("");
            setLoadingTable(false);
            sort_dates(RESPONSE.data);
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
    //Para separa en diferentes tablas, las alertas rojas y las amarillas
    async function separate(rowsData) {
        let rows = await rowsData;
        const tableR = [];
        const tableY = [];
        if (!rows) return console.log("No hay información para mostrar");
        console.debug(rows)
        if (!Array.isArray(rows)) return console.warn("No es un arreglo");
        //console.table(rows);
        for (const row of rows) {
            if (row.date_sighting) {
                //console.log(row.date_sighting)
                let dateFormat = new Date(row.date_sighting);
                if (dateFormat != "Invalid Date") row.date_sighting = dateFormat.toLocaleDateString("es-ES", { timeZone: 'UTC' });
            }
            if (row.state == "Reportado") {//Para saber que tipo de alerta es
              tableR.push(row);
            } else if (row.state == "Desaparecido") {
              tableY.push(row);
            }
        }
        setDataRed(tableR);
        setDataYellow(tableY);
    }
    //Para ejecutar las dos funciones anteriores
    async function loadData() {
        const dataTables = dataReport();
        separate(dataTables);
    }

    //Para obtener los datos al cargar la página
    useEffect(() => {
        loadData();
    }, [])

    return (
      <>
          {loadingTable && <Loading />}
          {!loadingTable && !errorData &&
              <TableReports data={dataRed} title="Reporte de Alertas Rojas" columns={columns} number={5} styles={tableStylesR} />
          }
          {!loadingTable && !errorData &&
              <TableReports data={dataYellow} title="Reporte de Alertas Amarillas" columns={columns} number={5} styles={tableStylesY}  />
          }
      </>
  )

}

export default CoincidenceReportsFree