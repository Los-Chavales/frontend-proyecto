
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "../styles/form.css";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    function signin(dataForm) {
        console.log(dataForm)
    }

    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <main>
            <div className="form-login-container">
                <h1 className="text-2xl font-bold">Login</h1>

                <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email:</label>
                    <input label="Write your email" type="email" name="email" placeholder="youremail@domain.tld"
                        {...register("email", { required: true })}
                    />

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Write your password"
                        {...register("password", { required: true, minLength: 4 })}
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
                </p>
            </div>
        </main>
    );
}