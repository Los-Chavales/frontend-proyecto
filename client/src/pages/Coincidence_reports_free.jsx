import { useState, useEffect } from "react";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import Sent from "../components/Sent";
import Loading from "../components/Loading";


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

function CoincidenceReportsFree() {
  const [dataCoincidenceR, setCoincidenceR] = useState([]);
  const [errorAPI, setErrorAPI] = useState("");
  const [errorData, setErrorData] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

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
        }
        for (const row of RESPONSE.data) {
            if (row.date_sighting) {
              //console.log(row.date_sighting)
              let dateFormat = new Date(row.date_sighting);
              if (dateFormat != "Invalid Date") row.date_sighting = dateFormat.toLocaleDateString("es-ES", { timeZone: 'UTC' });
          }
        }
        setErrorData(false);
        setErrorAPI("");
        setLoadingTable(false);
        return setCoincidenceR(RESPONSE.data);

    } catch (error) {
        console.log(error.response.status);
        let statusRes = error.response.status;
        let menError = error.message;
        if(statusRes === 404){
          if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
          if (!menError) menError = "Error al obtener los datos del servidor";
          console.error('Error al obtener los datos:', menError);
          setEmptyData(true);
          setErrorAPI(menError);
          setLoadingTable(false);
          return false;
        }else{
          if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
          if (!menError) menError = "Error al obtener los datos del servidor";
          console.error('Error al obtener los datos:', menError);
          setErrorData(true);
          setErrorAPI(menError);
          setLoadingTable(false);
          return false;
        }
    }
  }

  useEffect(() => {
    dataReport();
  }, [])


    return (
      <>
        {loadingTable && <Loading />}
        {!loadingTable && !errorData  && !emptyData && <TableReports data={dataCoincidenceR} title="Reportes Registrados" columns={columns} number={10}  />}
        {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI} />}
        {!loadingTable && emptyData && <Sent title="Lo sentimos" par={errorAPI} />}
      </>
  ) 
}

export default CoincidenceReportsFree