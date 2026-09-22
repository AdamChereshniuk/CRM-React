import { useState } from "react";
import "./LoginPage.scss";
import { useForm } from "react-hook-form";
import supabase from "../../supabase";
import { Link } from "react-router-dom";

interface ILoginForm {
    email: string,
    password: string,
};

export const LoginPage = () => {
    const [error, setError] = useState<string>("");

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>({ mode: "all" });

    const loginUser = async(email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
            return;
        };
        if (!data.user) {
            setError("Неверный email или пароль");
            return;
        };

        setError("");
        window.location.href = "/CRM-React/";
    };

    return (
        <div className="register-page">
            <div className="register__wrapper">
                <span className="register__title">Вход</span>

                <form className="register__form" onSubmit={handleSubmit(({ email, password }: ILoginForm) => {
                    loginUser(email, password);
                })}>
                    <input type="email" className="input" placeholder="Email" {...register("email", {
                        required: "Введите email",
                    })} />
                    <input type="password" className="input" placeholder="Пароль" {...register("password", {
                        required: "Введите пароль",
                        minLength: {
                            value: 8,
                            message: "Минимальная длина пароля - 8 символов",
                        },
                        maxLength: {
                            value: 20,
                            message: "Максимальная длина пароля - 20 символов",
                        },
                        pattern: /^[A-Za-z0-9@]+$/,
                    })} />

                    {error !== "" && <span className="error">{error}</span>}
                    {errors.email && <span className="error">{errors.email.message}</span>}
                    {errors.password && <span className="error">{errors.password.message}</span>}

                    <div className="btns">
                        <button className="register__btn btn" type="submit" disabled={!isValid}>Войти</button>
                        <Link className="register__btn btn" to="/CRM-React/register">Регистрация</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};