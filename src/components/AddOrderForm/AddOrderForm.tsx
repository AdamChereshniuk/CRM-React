import { addCustomer, addOrder, getCustomers } from "../../api";
import { useForm } from "react-hook-form";
import "./AddOrderForm.scss";

export interface IAddOrderForm {
    title: string,
    price: number,
    email: string,
    customer: string,
};

export const AddOrderForm = ({ status, userId }: { status: "gotten" | "process" | "problem" | "ready", userId: string }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IAddOrderForm>({ mode: "all" });
    const createOrder = async(title: string, price: number, customer: string, email: string) => {
        await getCustomers().then(async(data) => {
            const customersFromSupabase = data.filter(client => client.title.toLowerCase() == customer.toLowerCase());
            let customerId: number = 0;

            if(customersFromSupabase.length !== 0) {
                customerId = customersFromSupabase[0].id;
            } else {
                await addCustomer({
                    avatar_url: "https://avatars.mds.yandex.net/i?id=b0ebc5b80a33c61a671d5cbc398c372a81dd9370-4440211-images-thumbs&n=13",
                    title: customer,
                    email: email,
                    come_from: null,
                    user_id: userId,
                }).then(data => customerId = data.id);
            };

            await addOrder({ title: String(title), price_in_rubs: Number(price), email: String(email), status: status, customer_id: customerId, user_id: userId, });
            window.location.href = window.location.href;
        });
    };

    return (
        <form className="add-order-form" onSubmit={handleSubmit(({ title, price, customer, email }) => {
            createOrder(title, price, customer, email);
        })}>
            <input className="add-order-form__input input" type="text" placeholder="Название" {...register("title", {
                required: "Введите название",
                minLength: {
                    value: 2,
                    message: "Минимум 2 символа",
                },
                maxLength: {
                    value: 50,
                    message: "Максимум 50 символов",
                },
            })} />
            {errors.title && <span className="add-order-form__error">{errors.title.message}</span>}
            <input className="add-order-form__input input" type="number" placeholder="Сумма, ₽" {...register("price", {
                required: "Введите сумму",
                min: {
                    value: 1,
                    message: "Минимум 1₽",
                },
                max: {
                    value: 10000000,
                    message: "Минимум 10 000 000₽",
                },
            })} />
            {errors.price && <span className="add-order-form__error">{errors.price.message}</span>}
            <input className="add-order-form__input input" type="email" placeholder="Email" {...register("email", {
                required: "Введите email",
            })} />
            {errors.email && <span className="add-order-form__error">{errors.email.message}</span>}
            <input className="add-order-form__input input" type="text" placeholder="Заказчик" {...register("customer", {
                required: "Введите заказчика",
                minLength: {
                    value: 2,
                    message: "Минимум 2 символа",
                },
                maxLength: {
                    value: 50,
                    message: "Максимум 50 символов",
                },
            })} />
            {errors.customer && <span className="add-order-form__error">{errors.customer.message}</span>}

            <button className="add-order-form__btn btn" type="submit" disabled={!isValid}>Создать</button>
        </form>
    );
};