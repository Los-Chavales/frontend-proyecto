import { createContext, useContext, useState, useEffect } from "react";
import { API_REPORTS_FILES } from "../utils/api/conexion_server.js"

export const ReportContext = createContext();

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) throw new Error("useReport no está dentro de un ReportProvider");
    return context;
};

export const ReportProvider = ({ children }) => {
    const [report, setReport] = useState(null);
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

    async function register_report(dataForm) {
        console.log(dataForm)
        try {
            const RESPONSE = await API_REPORTS_FILES.post("/register", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            console.log(RESPONSE.data);
            setReport(RESPONSE.data)
            setMensage(true)

        } catch (error) {
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
        <ReportContext.Provider
            value={{
                report,
                register_report,
          /*       get_reports, */
                mensage,
                errorsServer,
            }}
        >
            {children}
        </ReportContext.Provider>
    );
};

export default ReportContext;