import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../../supabase.ts";
import "./RegisterPage.scss";

interface IRegisterForm {
    email: string,
    password: string,
    name: string,
};

export function RegisterPage() {
    const [error, setError] = useState<string>("");
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IRegisterForm>({ mode: "all" });
    const registerUser = async(email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        console.log(data);

        if (error) setError(error.message);
        if (!data.user) return;

        await supabase.from('user_profiles').upsert({
            user_id: data.user.id,
            name: name,
        });

        window.location.href = "/login";
    };

    return (
        <div className="register-page">
            <div className="register__wrapper">
                <span className="register__title">Регистрация</span>

                <form className="register__form" onSubmit={handleSubmit(({ email, password, name }: IRegisterForm) => {
                    registerUser(email, password, name);
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
                    <input type="text" className="input" placeholder="Имя" {...register("name", {
                        required: "Введите имя",
                        minLength: {
                            value: 2,
                            message: "Минимальная длина имени - 2 символов",
                        },
                        maxLength: {
                            value: 20,
                            message: "Максимальная длина имени - 20 символов",
                        },
                        pattern: /^[а-яёА-ЯЁ]+$/,
                    })} />

                    {error !== "" && <span className="error">{error}</span>}
                    {errors.email && <span className="error">{errors.email.message}</span>}
                    {errors.password && <span className="error">{errors.password.message}</span>}
                    {errors.name && <span className="error">{errors.name.message}</span>}

                    <div className="btns">
                        <button className="register__btn btn" type="submit" disabled={!isValid}>Зарегистрироваться</button>
                        <Link className="register__btn btn" to="/login">Войти</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};