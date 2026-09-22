import { useEffect, useState } from "react";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import "./ClientsPage.scss";
import type { Customer } from "../../types";
import { getCustomers, removeCustomer } from "../../api";
import client_icon from "../../assets/client.svg";
import { Link, useNavigate } from "react-router-dom";

export const ClientsPage = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Customer[]>([]);
    const [removeSureTextNumber, setRemoveSureTextNumber] = useState<number | null>(null);

    const removeClientFunc = (id: number) => {
        removeCustomer(id).then(() => window.location.href = window.location.href);
    };

    useEffect(() => {
        getCustomers().then(data => setClients(data));
    }, []);

    return (
        <div className="clients-page">
            <LeftSidebar />

            <div className="clients-page__box">
                <h1 className="clients-page__title title">Клиенты</h1>

                <div className="clients-page-table">
                    <div className="clients-page-table__top">
                        <span className="clients-page-table__top-cell">Изображения</span>
                        <span className="clients-page-table__top-cell">Наименование</span>
                        <span className="clients-page-table__top-cell">Email</span>
                        <span className="clients-page-table__top-cell">Откуда пришел</span>
                        <span className="clients-page-table__top-cell">Действия</span>
                    </div>
                    {clients.length !== 0 ? (
                        <div className="clients-page-table__main">
                            {clients.map((client, index) => {
                                return (
                                    <div className="clients-page-table__main-row">
                                        <div className="clients-page-table__main-cell clients-page-table__main-cell-1" onClick={() => navigate(`/CRM-React/clients/${client.id}`)}>
                                            <img src={client.avatar_url !== null && client.avatar_url !== "" ? client.avatar_url : client_icon} alt={client.title} />
                                        </div>
                                        <div className="clients-page-table__main-cell clients-page-table__main-cell-2" onClick={() => navigate(`/CRM-React/clients/${client.id}`)}>
                                            <span>{client.title}</span>
                                        </div>
                                        <div className="clients-page-table__main-cell clients-page-table__main-cell-3">
                                            <span>{client.email}</span>
                                        </div>
                                        <div className="clients-page-table__main-cell clients-page-table__main-cell-4">
                                            <span>{client.come_from == null || client.come_from == "" ? "не указано" : client.come_from}</span>
                                        </div>
                                        <div className="clients-page-table__main-cell clients-page-table__main-cell-5">
                                            {removeSureTextNumber == index && <span className="clients-page-table__main-sure-text">Удалить клиента?</span>}
                                            <button className="clients-page-table__main-btn btn" onClick={() => {
                                                if(removeSureTextNumber == index) {
                                                    setRemoveSureTextNumber(null);
                                                    removeClientFunc(client.id);
                                                } else {
                                                    setRemoveSureTextNumber(index);
                                                };
                                            }}>{removeSureTextNumber == index ? "Да" : "Удалить"}</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="clients-page-table__empty">
                            <span className="clients-page-table__empty-title">Пока у вас нет клиентов</span>
                            <Link className="clients-page-table__empty-link btn" to="/CRM-React/orders">Создать заказ</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};