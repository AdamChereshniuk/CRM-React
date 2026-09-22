import { Link } from "react-router-dom";
import "./HomePage.scss";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";

export function HomePage({ userName }: { userName: string }) {
    return (
        <div className="home-page">
            <LeftSidebar />

            <div className="home-page__box">
                <div className="home-page-wrapper">
                    <h1 className="home-page-wrapper__title title">Здравствуйте, {userName}!</h1>
                    <p className="home-page-wrapper__text">Сегодня отличный день, чтобы продолжить работу над текущими заказами или взять новый проект.</p>
                    <Link className="btn" to="orders">Перейти к заказам</Link>
                </div>
            </div>
        </div>
    );
};