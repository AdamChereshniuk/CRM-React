import { Link } from "react-router-dom";
import projects from "../../assets/projects.svg";
import clients from "../../assets/clients.svg";
import logout from "../../assets/logout.svg";
import home from "../../assets/home.svg";
import logo from "../../assets/logo.svg";
import help from "../../assets/help.svg";
import feedback from "../../assets/feedback.svg";
import supabase from "../../supabase";
import "./LeftSidebar.scss";

export function LeftSidebar() {
    const noLeftSidebarsUrls = ["/register", "/login"];

    const logoutFunc = async() => {
        await supabase.auth.signOut().then(() => window.location.href = "/");
    };
    
    if(noLeftSidebarsUrls.includes(window.location.pathname)) return <></>;
    
    return (
        <div className="left-sidebar">
            <Link className="left-sidebar__logo" to="/">
                <img className="left-sidebar__logo-img" src={logo} alt="Лого" />
            </Link>
            
            <nav className="left-sidebar__nav">
                <ul className="left-sidebar__list">
                    <li className="left-sidebar__item">
                        <Link to="/">
                            <img src={home} alt="Главная" />
                            Главная
                        </Link>
                    </li>
                    <li className="left-sidebar__item">
                        <Link to="/orders">
                            <img src={projects} alt="Заказы" />
                            Заказы
                        </Link>
                    </li>
                    <li className="left-sidebar__item">
                        <Link to="/clients">
                            <img src={clients} alt="Клиенты" />
                            Клиенты
                        </Link>
                    </li>
                    <li className="left-sidebar__item">
                        <Link to="/feedback">
                            <img src={feedback} alt="Фидбэк" />
                            Фидбэк
                        </Link>
                    </li>
                    <li className="left-sidebar__item">
                        <Link to="/help">
                            <img src={help} alt="Помощь" />
                            Помощь
                        </Link>
                    </li>
                </ul>
            </nav>

            <button className="left-sidebar__logout-btn" onClick={logoutFunc}>
                <img src={logout} alt="Выйти" />
                Выйти
            </button>
        </div>
    );
};