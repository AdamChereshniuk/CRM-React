import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FeedbackPage } from "./pages/FeedbackPage/FeedbackPage";
import { ClientsPage } from "./pages/ClientsPage/ClientsPage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { ClientPage } from "./pages/ClientPage/ClientPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./App.scss";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  supabase.auth.getUser().then((data) => {
    if (!data.error) {
      setIsAuthenticated(true);
      setUser(data.data.user);
    };
  });
  useEffect(() => {
    if(user?.id !== undefined) {
      supabase.from('user_profiles').select('*').eq('user_id', user.id).single().then(data => setUserName(data.data.name));
    };
  }, [user?.id]);

  return (
    <>
      <BrowserRouter>
        <div className="app">
          {isAuthenticated && user ? (
            <>
              <Routes>
                <Route path="/" element={<HomePage userName={userName} />} />
                <Route path="/orders" element={<OrdersPage userId={user.id} />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/:id" element={<ClientPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                  <div className="wrapper">
                    <div className="login-wrapper">
                      <h1 className="login-wrapper__title">Войдите или зарегистрируйтесь, чтобы пользоваться сервисом</h1>
                      <div className="login-wrapper__btns">
                        <Link className="login-wrapper__login-btn btn" to="/login">Войти</Link>
                        <Link className="login-wrapper__register-btn btn" to="/register">Зарегистрироваться</Link>
                      </div>
                    </div>
                  </div>
                } />
              </Routes>
            </>
          )}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;