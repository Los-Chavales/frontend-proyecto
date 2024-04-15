import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/App.css";
import TableReports from "../components/Table_reports";
import { API_REPORTS } from "../utils/api/conexion_server";
import Sent from "../components/Sent";
import Loading from "../components/Loading";
import sort_dates from "../utils/functions/sort_dates";

function CoincidenceReports() {
    /* Tabla */
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
        selector: row => <a onClick={() => showWindow(row.description)}>{row.description}</a>,
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
  //Función para abrir la ventana modal
  const [windowDetails, setWindowDetails] = useState(false);
  const [windowContent, setWindowContent] = useState('');
  const showWindow = function (message) {
    if (message) {
      setWindowContent(message);
      setWindowDetails(true);
    }
  }
  const closeWindow = () => {
    setWindowDetails(false);
    setWindowContent('');
  }
  const [dataCoincidenceR, setCoincidenceR] = useState([]);
  const [errorAPI, setErrorAPI] = useState("");
  const [errorData, setErrorData] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [dataRed, setDataRed] = useState(false)
  const [dataYellow, setDataYellow] = useState(false);

  const paramsDataRoute = useParams();
  console.debug(paramsDataRoute)

  async function dataReport() {
    try {
        const RESPONSE = await API_REPORTS.get(`/coincidence_reports/${paramsDataRoute.id}`);
        //console.debug(RESPONSE)
        if (RESPONSE.status != 200) {
            console.warn(RESPONSE.response.data);
            return false;
        }
        if (!Array.isArray(RESPONSE.data)) {
            console.warn("No es un array");
            return false;
        }
        setErrorData(false);
        setErrorAPI("");
        setLoadingTable(false);
        if(RESPONSE.data[0].state === "Reportado"){
          setDataRed(true)
        } else if (RESPONSE.data[0].state === "Desaparecido"){
          setDataYellow(true)
        }
        sort_dates(RESPONSE.data);
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
        {!loadingTable && !errorData && windowDetails &&
          <section className="modal-message">
            <div className="modal-container">
              <h3 className="modal-title">Mensaje</h3>
              <button className="modal-close" onClick={closeWindow}>
                X
              </button>
              <div className="modal-content">
                <p>{windowContent}</p>
              </div>
            </div>
          </section>
        }
        {dataRed && !loadingTable && !errorData && !emptyData && <TableReports data={dataCoincidenceR} title="Reportes Registrados" columns={columns} number={10} styles={tableStylesR} />}
        {dataYellow && !loadingTable && !errorData && !emptyData && <TableReports data={dataCoincidenceR} title="Reportes Registrados" columns={columns} number={10} styles={tableStylesY} />}
        {!loadingTable && errorData && <Sent title="Ha ocurrido un error" par={errorAPI} />}
        {!loadingTable && emptyData && <Sent title="Lo sentimos" par={errorAPI} />}
      </>
  ) 
}

export default CoincidenceReports