import { createContext, useContext, useState, useEffect } from "react";
import { API_REPORTSV } from "../utils/api/conexion_server.js"

export const ReportVContext = createContext();

export const useReportV = () => {
    const context = useContext(ReportVContext);
    if (!context) throw new Error("useReport no está dentro de un ReportProvider");
    return context;
};

export const ReportVProvider = ({ children }) => {
    const [reportV, setReportV] = useState(null);
    const [mensage, setMensage] = useState(false);
    const [errorsServer, setErrorsServer] = useState([]);


    useEffect(() => {
        if (errorsServer.length > 0) {
          const timer = setTimeout(() => {
            setErrorsServer([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errorsServer]);

    async function register_reportV(dataForm) {
        console.log("EStá llegando a verified context sin tanto rollo")
        console.log(dataForm)
        try {
            const RESPONSE = await API_REPORTSV.post("/register", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            console.log(RESPONSE.data);
            setReportV(RESPONSE.data)
            setMensage(true)

        } catch (error) {
            console.log(error)
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al registrar reporte:', menError);
            console.debug(menError);
            setErrorsServer([menError]);
            return error; 
        }
    }

/*     async function get_reports() {
        const RESPONSE = await API_REPORTS.get("/report/watch");
        console.log(RESPONSE)
    } */

    return (
        <ReportVContext.Provider
            value={{
                reportV,
                register_reportV,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </ReportVContext.Provider>
    );
};

export default ReportVContext;