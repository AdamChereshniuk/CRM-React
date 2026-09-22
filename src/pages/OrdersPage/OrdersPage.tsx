import { AddOrderForm } from "../../components/AddOrderForm/AddOrderForm";
import { useEffect, useState } from "react";
import create_order from "../../assets/create_order.svg";
import close from "../../assets/close.svg";
import "./OrdersPage.scss";
import { getCustomers, getOrders } from "../../api";
import type { Customer, Order } from "../../types";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { DetailsModal } from "../../components/DetailsModal/DetailsModal";

type TActiveCreateOrderFormNumber = 1 | 2 | 3 | 4 | null;

export const OrdersPage = ({ userId }: { userId: string }) => {
    const [activeCreateOrderFormNumber, setActiveCreateOrderFormNumber] = useState<TActiveCreateOrderFormNumber>(null);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [customersById, setCustomersById] = useState<[number, Customer][]>([[
        0, {
            id: 0,
            avatar_url: null,
            title: "",
            email: "",
            come_from: null,
            user_id: "",
            created_at: "",
        }
    ]]);
    const [orderIdForDetailsModal, setOrderIdForDetailsModal] = useState<number | null>(null);

    const setActiveCreateOrderFormNumberFunc = (formNumber: TActiveCreateOrderFormNumber) => {
        if(activeCreateOrderFormNumber == formNumber) {
            setActiveCreateOrderFormNumber(null);
        } else {
            setActiveCreateOrderFormNumber(formNumber);  
        };
    };

    useEffect(() => {
        getOrders().then(data => {
            setOrders(data);
            let arr: [number, Customer][] = [];
            for (const order of data) {
                getCustomers().then(data2 => {
                    arr.push([order.id, data2.filter(cus => cus.id == order.customer_id)[0]]);
                });
            };
            setCustomersById(arr);
        });
    }, []);

    return (
        <>
            <div className="orders-page" style={{ opacity: `${orderIdForDetailsModal !== null ? "0.1" : "1"}` }} onClick={() => {
                if(orderIdForDetailsModal !== null) setOrderIdForDetailsModal(null);
            }}>
                <LeftSidebar />

                <div className="orders-page__box">
                    <h1 className="orders-page__title title">Ваши заказы</h1>

                    <ul className="orders-page__list">
                        <li className="orders-page__item">
                            <span className="orders-page__item-title orders-page__item-title-1">Получено</span>
                            {orders?.filter(order => order.status == "gotten").length !== 0 && <div className="orders-page__item-cards">
                                {orders?.filter(order => order.status == "gotten").map((order) => {
                                    return (
                                        <>
                                            <div className="orders-page__item-card" onClick={() => setOrderIdForDetailsModal(order.id)}>
                                                <span className="orders-page__item-card-title">{order.title}</span>
                                                <span className="orders-page__item-card-price">{order.price_in_rubs} ₽</span>
                                                <span className="orders-page__item-card-company">{customersById.length > 1 && customersById.filter(obj => String(obj[0]) == String(order.id))[0][1].title}</span>
                                                <span className="orders-page__item-card-date">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>}
                            <button className="orders-page__item-card-btn" onClick={() => setActiveCreateOrderFormNumberFunc(1)}>
                                <img src={activeCreateOrderFormNumber == 1 ? close : create_order} alt="Создать заказ" />
                            </button>
                            {activeCreateOrderFormNumber == 1 && <AddOrderForm status="gotten" userId={userId} />}
                        </li>
                        <li className="orders-page__item">
                            <span className="orders-page__item-title orders-page__item-title-2">В работе</span>
                            {orders?.filter(order => order.status == "process").length !== 0 && <div className="orders-page__item-cards">
                                {orders?.filter(order => order.status == "process").map((order) => {
                                    return (
                                        <>
                                            <div className="orders-page__item-card" onClick={() => setOrderIdForDetailsModal(order.id)}>
                                                <span className="orders-page__item-card-title">{order.title}</span>
                                                <span className="orders-page__item-card-price">{order.price_in_rubs} ₽</span>
                                                <span className="orders-page__item-card-company">{customersById.length > 1 && customersById.filter(obj => obj[0] == order.id)[0][1].title}</span>
                                                <span className="orders-page__item-card-date">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>}
                            <button className="orders-page__item-card-btn" onClick={() => setActiveCreateOrderFormNumberFunc(2)}>
                                <img src={activeCreateOrderFormNumber == 2 ? close : create_order} alt="Создать заказ" />
                            </button>
                            {activeCreateOrderFormNumber == 2 && <AddOrderForm status="process" userId={userId} />}
                        </li>
                        <li className="orders-page__item">
                            <span className="orders-page__item-title orders-page__item-title-3">Проблема</span>
                            {orders?.filter(order => order.status == "problem").length !== 0 && <div className="orders-page__item-cards">
                                {orders?.filter(order => order.status == "problem").map((order) => {
                                    return (
                                        <>
                                            <div className="orders-page__item-card" onClick={() => setOrderIdForDetailsModal(order.id)}>
                                                <span className="orders-page__item-card-title">{order.title}</span>
                                                <span className="orders-page__item-card-price">{order.price_in_rubs} ₽</span>
                                                <span className="orders-page__item-card-company">{customersById.length > 1 && customersById.filter(obj => obj[0] == order.id)[0][1].title}</span>
                                                <span className="orders-page__item-card-date">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>}
                            <button className="orders-page__item-card-btn" onClick={() => setActiveCreateOrderFormNumberFunc(3)}>
                                <img src={activeCreateOrderFormNumber == 3 ? close : create_order} alt="Создать заказ" />
                            </button>
                            {activeCreateOrderFormNumber == 3 && <AddOrderForm status="problem" userId={userId} />}
                        </li>
                        <li className="orders-page__item">
                            <span className="orders-page__item-title orders-page__item-title-4">Готово</span>
                            {orders?.filter(order => order.status == "ready").length !== 0 && <div className="orders-page__item-cards">
                                {orders?.filter(order => order.status == "ready").map((order) => {
                                    return (
                                        <>
                                            <div className="orders-page__item-card" onClick={() => setOrderIdForDetailsModal(order.id)}>
                                                <span className="orders-page__item-card-title">{order.title}</span>
                                                <span className="orders-page__item-card-price">{order.price_in_rubs} ₽</span>
                                                <span className="orders-page__item-card-company">{customersById.length > 1 && customersById.filter(obj => obj[0] == order.id)[0][1].title}</span>
                                                <span className="orders-page__item-card-date">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>}
                            <button className="orders-page__item-card-btn" onClick={() => setActiveCreateOrderFormNumberFunc(4)}>
                                <img src={activeCreateOrderFormNumber == 4 ? close : create_order} alt="Создать заказ" />
                            </button>
                            {activeCreateOrderFormNumber == 4 && <AddOrderForm status="ready" userId={userId} />}
                        </li>
                    </ul>
                </div>
            </div>
            
            {orderIdForDetailsModal && <DetailsModal orderId={orderIdForDetailsModal} userId={userId} />}
        </>
    );
};