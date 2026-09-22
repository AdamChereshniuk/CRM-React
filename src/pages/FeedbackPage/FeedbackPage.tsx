import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { useEffect, useState } from "react";
import { addFeedback, getFeedbacks, removeFeedback } from "../../api";
import type { Feedback } from "../../types";
import trash from "../../assets/trash.svg";
import "./FeedbackPage.scss";

export const FeedbackPage = () => {
    const [reviews, setReviews] = useState<Feedback[]>([]);
    const [error, setError] = useState<string>("");
    const [starsAmount, setStarsAmount] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    const [textareaValue, setTextareaValue] = useState<string>("");

    const removeFeedbackFunc = (id: number) => {
        removeFeedback(id).then(() => window.location.href = window.location.href);
    };

    const sendFeedback = () => {
        if(starsAmount == 0) {
            setError("Поставьте рейтинг");
            return;
        } else if(textareaValue.length < 10 || textareaValue.length > 500) {
            setError("Минимальная длина сообщени 10 символов, максимальная - 500 символов");
            return;
        };

        setError("");
        
        addFeedback(starsAmount, textareaValue).then(() => window.location.href = window.location.href);
    };

    useEffect(() => {
        getFeedbacks().then(data => setReviews(data));
    }, []);

    return (
        <div className="feedback-page">
            <LeftSidebar />

            <div className="feedback-page__box">
                <h1 className="feedback-page__title title">Обратная связь</h1>

                <form className="feedback-page__form" onSubmit={e => {
                    e.preventDefault();
                    sendFeedback();
                }}>
                    <ul className="feedback-page__stars">
                        <li className="feedback-page__star" onClick={() => setStarsAmount(1)}>
                            <svg width="40" height="40" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill={1 <= starsAmount ? "#FFBB00" : "#666666"}/>
                            </svg>
                        </li>
                        <li className="feedback-page__star" onClick={() => setStarsAmount(2)}>
                            <svg width="40" height="40" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill={2 <= starsAmount ? "#FFBB00" : "#666666"}/>
                            </svg>
                        </li>
                        <li className="feedback-page__star" onClick={() => setStarsAmount(3)}>
                            <svg width="40" height="40" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill={3 <= starsAmount ? "#FFBB00" : "#666666"}/>
                            </svg>
                        </li>
                        <li className="feedback-page__star" onClick={() => setStarsAmount(4)}>
                            <svg width="40" height="40" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill={4 <= starsAmount ? "#FFBB00" : "#666666"}/>
                            </svg>
                        </li>
                        <li className="feedback-page__star" onClick={() => setStarsAmount(5)}>
                            <svg width="40" height="40" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill={5 <= starsAmount ? "#FFBB00" : "#666666"}/>
                            </svg>
                        </li>
                    </ul>
                    <textarea className="feedback-page__textarea" value={textareaValue} onInput={e => setTextareaValue(e.currentTarget.value)} placeholder="Опишите ваши впечатления от работы с сервисом и помогите нам стать лучше..."></textarea>
                    {error !== "" && <span>{error}</span>}
                    <button className="feedback-page__btn btn" type="submit">Отправить</button>
                </form>

                {reviews.length !== 0 && (
                    <>
                        <span className="feedback-page__reviews-title">Ваши отзывы</span>
                        <ul className="feedback-page__reviews">
                            {reviews.map(review => {
                                return (
                                    <li className="feedback-page__review">
                                        <div>
                                            <ul>
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <>
                                                        {num <= review.rating && (
                                                            <li>
                                                                <svg width="20" height="20" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M3.61065 14.9435C3.22465 15.1415 2.78665 14.7945 2.86465 14.3515L3.69465 9.6215L0.171653 6.2655C-0.157347 5.9515 0.0136534 5.3775 0.454653 5.3155L5.35265 4.6195L7.53665 0.2925C7.73365 -0.0975 8.26665 -0.0975 8.46365 0.2925L10.6477 4.6195L15.5457 5.3155C15.9867 5.3775 16.1577 5.9515 15.8277 6.2655L12.3057 9.6215L13.1357 14.3515C13.2137 14.7945 12.7757 15.1415 12.3897 14.9435L7.99865 12.6875L3.61065 14.9435Z" fill="#FFBB00"/>
                                                                </svg>
                                                            </li>
                                                        )}
                                                    </>
                                                ))}
                                            </ul>
                                            <span>{new Date(review.created_at).toLocaleDateString("ru-RU")}</span>
                                        </div>
                                        <p>{review.text}</p>
                                        <button onClick={() => removeFeedbackFunc(review.id)}>
                                            <img src={trash} alt="Удалить" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};