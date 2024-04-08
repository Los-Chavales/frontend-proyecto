import { createContext, useContext, useState, useEffect } from "react";
import API_SERVER from "../utils/api/conexion_server.js"

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth no está dentro de un AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errorsServer, setErrorsServer] = useState([]);


    useEffect(() => {
        if (errorsServer.length > 0) {
          const timer = setTimeout(() => {
            setErrorsServer([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errorsServer]);


    async function signup(dataForm) {
        console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/register", dataForm);

            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            //console.log(RESPONSE.data);
            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al registar usuario:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }

    async function signin(dataForm) {
        console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/login", dataForm);
            if (RESPONSE.status != 200) {
                return console.warn(RESPONSE.response.data);
            }
            //console.log(RESPONSE.data);
            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            let menError = error.message;
            if (error.response) menError = error.response.data.message;
            console.error('Error al iniciar sesión:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                isAuth,
                errorsServer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;