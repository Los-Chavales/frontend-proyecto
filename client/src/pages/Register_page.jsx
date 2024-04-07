
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import API_SERVER from "../utils/api/conexion_server.js"
import "../styles/form.css";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    async function signin(dataForm) {
        console.log(dataForm)
        const RESPONSE = await API_SERVER
            .post("/register", dataForm)
            .catch((error) => {
                if (!error.response) { console.error('Error al registar usuario:', error.message); return error };
                console.error('Error al registar usuario:', error.response.data.message);
                return error;
            });
        console.info(RESPONSE);

        if (RESPONSE.status != 200) {
            return console.log(RESPONSE.response.data);
        }

        console.log(RESPONSE.data);
        setIsAuth(true)

    }

    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuth) {
            console.log('Navegar')
            navigate("/");
        }
    }, [isAuth]);

    return (
        <main>
            <div className="form-user-container">
                <form className="form-user" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Regístrate</h1>

                    <input className="input-user" type="email" name="email" placeholder="Correo Electrónico"
                        {...register("email", { required: true })}
                    />

                    <input className="input-user" type="text" name="username" placeholder="Usuario"
                        {...register("username")}
                        autoFocus
                    />

                    <input className="input-user" type="password" name="password" placeholder="Contraseña"
                        {...register("password", { required: true, minLength: 4 })}
                    />

                    <button className="button-user" type="submit">Siguiente</button>
                </form>
            </div>
        </main>
    );
}