import { addComment, addCustomer, getComments, getCustomers, getOrders, removeOrder, updateOrder } from "../../api";
import type { Comment, Customer, Order, OrderStatus } from "../../types";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import "./DetailsModal.scss";

export const DetailsModal = ({ orderId, userId }: { orderId: number, userId: string }) => {
    const [error, setError] = useState<string>("");
    const [commentError, setCommentError] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [showRemoveSureText, setShowRemoveSureText] = useState<boolean>(false);
    const [order, setOrder] = useState<Order>();
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer>();
    const [orderTitleInputValue, setOrderTitleInputValue] = useState<string>("");
    const [orderPriceInputValue, setOrderPriceInputValue] = useState<number>(0);
    const [orderEmailInputValue, setOrderEmailInputValue] = useState<string>("");
    const [orderCustomerInputValue, setOrderCustomerInputValue] = useState<string>("");
    const [newCommentText, setNewCommentText] = useState<string>("");

    const updateOrderFunc = async (title: string, price: number, customer: string, email: string) => {
        if (title.length < 2 || title.length > 50 || customer.length < 2 || customer.length > 50 || price < 1 || price > 10_000_000) {
            setError("Введите корректные данные");
            return;
        };

        try {
            setError("");

            // 1. Проверяем авторизацию
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            console.log("1. auth user:", user?.id);
            console.log("auth error:", authError);

            if (!user) {
                setError("Не авторизован");
                return;
            };

            // 2. Проверяем orderId
            console.log("2. orderId:", orderId, typeof orderId);

            // 3. Ищем заказчика
            const customers = await getCustomers();
            console.log("3. customers:", customers);

            const existing = customers.find((c) => c.title === customer);

            let customerId: number;

            if (existing) {
                customerId = existing.id;
            } else {
                const newCustomer = await addCustomer({
                    avatar_url: "https://avatars.mds.yandex.net/i?id=b0ebc5b80a33c61a671d5cbc398c372a81dd9370-4440211-images-thumbs&n=13",
                    title: customer,
                    email: email,
                    come_from: null,
                    user_id: user.id,
                });
                customerId = newCustomer.id;
            };

            console.log("4. customerId:", customerId);

            // 5. Обновляем заказ
            const updated = await updateOrder(orderId, {
                title,
                price_in_rubs: price,
                email,
                status: orderStatus !== null ? orderStatus : order?.status,
                customer_id: customerId,
            }).then(() => window.location.href = window.location.href);

            console.log("5. Результат updateOrder:", updated);
        } catch (err) {
            console.error("ПОЛНАЯ ОШИБКА:", err);
            setError(err instanceof Error ? err.message : "Ошибка");
        };
    };
    const removeOrderFunc = async () => {
        setShowRemoveSureText(false);
        removeOrder(orderId).then(() => window.location.href = window.location.href);
    };

    useEffect(() => {
        getOrders().then(data => {
            const orderById = data.filter(el => el.id == orderId)[0];
            setOrder(orderById);
        });
        getComments(orderId).then(data => setComments(data));
    }, []);
    useEffect(() => {
        getCustomers().then(data => setCustomer(data.filter(el => el.id == order?.customer_id)[0]));
    }, [order]);
    useEffect(() => {
        setOrderTitleInputValue(order?.title || "");
        setOrderPriceInputValue(order?.price_in_rubs || 0);
        setOrderEmailInputValue(order?.email || "");
        setOrderStatus(order?.status || null);
        setOrderCustomerInputValue(customer?.title || "");
    }, [customer]);
    useEffect(() => console.log(comments), [comments]);

    const setOrderStatusFunc = (status: OrderStatus) => {
        setOrderStatus(status);
        setIsOrderStatusModalOpen(false);
    };
    const addCommentFunc = () => {
        if(newCommentText.length < 2 || newCommentText.length > 100) {
            setCommentError("Мин. 2 символа, макс. - 100 символов");
            return;
        };

        addComment({
            text: newCommentText,
            order_id: orderId,
            user_id: Number(userId),
        }).then(() => window.location.href = window.location.href);
    };

    return (
        <div className="right-sidebar">
            <span className="right-sidebar__title">Заказ #{order?.id}</span>

            <form className="right-sidebar__form" onSubmit={e => {
                e.preventDefault();
                updateOrderFunc(orderTitleInputValue, orderPriceInputValue, orderCustomerInputValue, orderEmailInputValue);
            }}>
                <input
                    className="right-sidebar__input input"
                    value={orderTitleInputValue}
                    onInput={(e) => setOrderTitleInputValue(e.currentTarget.value)}
                    type="text"
                    placeholder="Название"
                />
                <input
                    className="right-sidebar__input input"
                    value={orderPriceInputValue}
                    onInput={(e) => setOrderPriceInputValue(Number(e.currentTarget.value))}
                    type="number"
                    placeholder="Сумма, ₽"
                />
                <input
                    className="right-sidebar__input input"
                    value={orderEmailInputValue}
                    onInput={(e) => setOrderEmailInputValue(e.currentTarget.value)}
                    type="email"
                    placeholder="Email"
                />
                <input
                    className="right-sidebar__input input"
                    value={orderCustomerInputValue}
                    onInput={(e) => setOrderCustomerInputValue(e.currentTarget.value)}
                    type="text"
                    placeholder="Заказчик"
                />
                <div className="right-sidebar__select-wrapper">
                    <span className="right-sidebar__text">Статус:</span>
                    <div className="right-sidebar__select">
                        <span className="right-sidebar__select-title" onClick={() => setIsOrderStatusModalOpen(!isOrderStatusModalOpen)}>
                            {orderStatus == "gotten" && "Получено"}
                            {orderStatus == "process" && "В процессе"}
                            {orderStatus == "problem" && "Проблема"}
                            {orderStatus == "ready" && "Готово"}
                        </span>
                        {isOrderStatusModalOpen && (
                            <div className="right-sidebar__select-modal">
                                <div className="right-sidebar__select-option" onClick={() => setOrderStatusFunc("gotten")}>Получено</div>
                                <div className="right-sidebar__select-option" onClick={() => setOrderStatusFunc("process")}>В процессе</div>
                                <div className="right-sidebar__select-option" onClick={() => setOrderStatusFunc("problem")}>Проблема</div>
                                <div className="right-sidebar__select-option" onClick={() => setOrderStatusFunc("ready")}>Готово</div>
                            </div>
                        )}
                    </div>
                </div>

                {error !== "" && <span>{error}</span>}

                <button className="right-sidebar__btn btn" type="submit">Обновить</button>
                {showRemoveSureText && <span className="right-sidebar__remove-sure-text">Вы действительно хотите удалить этот заказ?</span>}
                <button className="right-sidebar__remove-btn btn" type="button" onClick={() => {
                    if(showRemoveSureText) {
                        removeOrderFunc();
                    } else {
                        setShowRemoveSureText(true);
                    };
                }}>{showRemoveSureText ? "Да" : "Удалить"}</button>
            </form>

            <div className="right-sidebar__comments">
                <h2 className="right-sidebar__comments-title">Комментарии</h2>

                {comments.length !== 0 && (
                    <ul className="right-sidebar__comments-list">
                        {comments.map(comm => {
                            return (
                                <li className="right-sidebar__comments-item">
                                    <div>
                                        <span>{comm.user_id !== null ? `Пользователь #${comm.user_id}` : "Неизвестный пользователь"}</span>
                                        <span>{new Date(comm.created_at).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                    <p>{comm.text}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form className="right-sidebar__comments-form" onSubmit={e => {
                    e.preventDefault();
                    addCommentFunc();
                }}>
                    <textarea className="right-sidebar__comments-textarea" value={newCommentText} onInput={e => setNewCommentText(e.currentTarget.value)} rows={2} placeholder="Ваш комментарий"></textarea>
                    {commentError && <span>{commentError}</span>}
                    <button className="right-sidebar__comments-btn btn" type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
};