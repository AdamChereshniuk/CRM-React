import { useState } from "react";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import "./HelpPage.scss";

export const HelpPage = () => {
    const [activeQuestionNumber, setActiveQuestionNumber] = useState<number | null>(null);
    
    const openQuestionAnswer = (questionNumber: number) => {
        if(activeQuestionNumber == questionNumber) {
            setActiveQuestionNumber(null);
        } else {
            setActiveQuestionNumber(questionNumber);
        };
    };

    return (
        <div className="help-page">
            <LeftSidebar />

            <div className="help-page__box">
                <h1 className="help-page__title title">Помощь</h1>

                <ul className="help-page__list">
                    <li className="help-page__item">
                        <span className="help-page__item-title" onClick={() => openQuestionAnswer(1)}>Как начать работу с сервисом?</span>
                        {activeQuestionNumber == 1 && <p className="help-page__item-text">Чтобы создавать и работать с заказами, войдите в свой профиль или зарегистрируйтесь.</p>}
                    </li>
                    <li className="help-page__item">
                        <span className="help-page__item-title" onClick={() => openQuestionAnswer(2)}>Как создать заказ?</span>
                        {activeQuestionNumber == 2 && <p className="help-page__item-text">Создать новый заказ можно во вкладке "Заказы", введя название, сумму, email и имя заказчика.</p>}
                    </li>
                    <li className="help-page__item">
                        <span className="help-page__item-title" onClick={() => openQuestionAnswer(3)}>Как управлять заказами?</span>
                        {activeQuestionNumber == 3 && <p className="help-page__item-text">Чтобы изменить или удалить заказ, нажмите на его карточку во вкладке "Заказы", введите новые данные и нажмите на кнопку "Обновить/Удалить".</p>}
                    </li>
                    <li className="help-page__item">
                        <span className="help-page__item-title" onClick={() => openQuestionAnswer(4)}>Как создать клиента?</span>
                        {activeQuestionNumber == 4 && <p className="help-page__item-text">Создать клиента отдельно нельзя, но вы можете создать новый заказ, введя email и имя клиента и он появится во вкладке "Клиенты".</p>}
                    </li>
                    <li className="help-page__item">
                        <span className="help-page__item-title" onClick={() => openQuestionAnswer(5)}>Как управлять клиентами?</span>
                        {activeQuestionNumber == 5 && <p className="help-page__item-text">Чтобы изменить клиента, нажмите на его иконку или наименование во вкладке "Клиенты", введите новые данные и нажмите на кнопку "Обновить". Чтобы удалить клиента, нажмите на кнопку "Удалить" в таблице клиентов.</p>}
                    </li>
                </ul>
            </div>
        </div>
    );
};