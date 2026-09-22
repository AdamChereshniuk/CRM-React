import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Customer } from "../../types";
import { getCustomers, updateCustomer } from "../../api";
import "./ClientPage.scss";

export const ClientPage = () => {
    const { id } = useParams();
    const [client, setClient] = useState<Customer>();
    const [error, setError] = useState<string>("");
    const [clientNameValue, setClientNameValue] = useState<string>("");
    const [clientEmailValue, setClientEmailValue] = useState<string>("");
    const [clientAvatarUrlValue, setClientAvatarUrlValue] = useState<string>("");
    const [clientComeFromValue, setClientComeFromValue] = useState<string>("");

    const updateCustomerFunc = (name: string, email: string, avatarUrl: string, comeFrom: string | null) => {
        if (name.length < 2 || name.length > 50 || avatarUrl.length > 200 || String(comeFrom).length > 50) {
            setError("Введите корректные данные");
            return;
        };

        try {
            updateCustomer(Number(id), {
                avatar_url: avatarUrl,
                title: name,
                email: email,
                come_from: comeFrom,
            }).then(() => window.location.href = "/CRM-React/clients");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка");
        };
    };

    useEffect(() => {
        getCustomers().then(data => setClient(data.filter(el => el.id == Number(id))[0]));
    }, []);
    useEffect(() => {
        setClientNameValue(client?.title || "");
        setClientEmailValue(client?.email || "");
        setClientAvatarUrlValue(client?.avatar_url || "");
        setClientComeFromValue(client?.come_from || "");
    }, [client]);

    return (
        <div className="client-page">
            <LeftSidebar />

            <div className="client-page__box">
                <h1 className="client-page__title title">Редактирование "{client?.title}"</h1>

                <form className="client-page__form" onSubmit={e => {
                    e.preventDefault();
                    updateCustomerFunc(clientNameValue, clientEmailValue, clientAvatarUrlValue, clientComeFromValue);
                }}>
                    <div className="client-page__form-inputs">
                        <input className="client-page__form-input input" type="text" placeholder="Наименование" value={clientNameValue} onInput={e => setClientNameValue(e.currentTarget.value)} />
                        <input className="client-page__form-input input" type="email" placeholder="Email" value={clientEmailValue} onInput={e => setClientEmailValue(e.currentTarget.value)} />
                        <input className="client-page__form-input input" type="text" placeholder="Url аватара" value={clientAvatarUrlValue} onInput={e => setClientAvatarUrlValue(e.currentTarget.value)} />
                        <input className="client-page__form-input input" type="text" placeholder="Откуда пришел" value={clientComeFromValue} onInput={e => setClientComeFromValue(e.currentTarget.value)} />
                    </div>
                    {error !== "" && <span>{error}</span>}
                    <button className="client-page__form-btn btn" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
};