import { createContext, useContext, useState, useEffect } from "react";
import API_SERVER from "../utils/api/conexion_server.js"

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
            const RESPONSE = await API_SERVER.post("/report/", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            console.log(RESPONSE.data);
            setReport(RESPONSE.data)
            setMensage(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al registar reporte:');
            console.error(menError);
            setErrorsServer([menError]);
            return error;
        }
    }

    async function get_reports() {
        const RESPONSE = await API_SERVER.get("/report/watch");
        console.log(RESPONSE)
    }

    return (
        <ReportContext.Provider
            value={{
                report,
                register_report,
                get_reports,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </ReportContext.Provider>
    );
};

export default ReportContext;