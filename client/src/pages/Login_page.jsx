
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth_context";
import "../styles/form.css";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signin, user, isAuth, errorsServer } = useAuth();
    const navigate = useNavigate();

    //console.log(user);

    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuth) {
            if (user && user.role == "admin") return navigate("/users");
            if (user && user.role == "supervisor") return navigate("/home");
            navigate("/coincidence_reports_free");
            //console.log('navegar');
        }
    }, [isAuth]);

    return (
        <main>
            <div className="form-user-container">
                <form className="form-user" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Acceso</h1>

                    <input className="input-user" type="email" name="email" placeholder="Correo Electrónico"
                        {...register("email", { required: true })}
                        autoFocus
                    />
                    {errors.email && (<p className="p-input-user">Se requiere un email</p>)}

                    <input className="input-user" type="password" name="password" placeholder="Contraseña"
                        {...register("password", { required: true })}
                    />
                    {errors.password && (<p className="p-input-user">Se requiere una contraseña</p>)}


                    <button className="button-user" type="submit">Siguiente</button>

                    {//Mostrar errores
                        errorsServer.map((error, i) => (
                            <div className="p-error-user" key={i}>
                                <p>{error}</p>
                            </div>
                        ))
                    }

                </form>
            </div>
        </main>
    );
}