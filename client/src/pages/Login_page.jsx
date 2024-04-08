
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth_context";
import "../styles/form.css";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signin, user, isAuth, errorsServer } = useAuth();
    const navigate = useNavigate();

    console.log(user);
    
    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuth) {
            //navigate("/");
            console.log('navegar')
        }
    }, [isAuth]);

    return (
        <main>
            <div className="form-user-container">
                {
                    errorsServer.map((error, i) => (
                        <div key={i}>
                            {error}
                        </div>
                    ))
                }

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
                </form>
            </div>
        </main>
    );
}