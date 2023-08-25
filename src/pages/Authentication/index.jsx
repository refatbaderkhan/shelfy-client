import React, { useState } from "react";
import "./style.css";
import LoginForm from "../../components/ui/authenticationForms/Login";
import RegisterForm from "../../components/ui/authenticationForms/Register";

const Authentication = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="flex center page">
      {login ? (
        <LoginForm onToggleLogin={() => setLogin(false)} />
      ) : (
        <RegisterForm onToggleRegister={() => setLogin(true)} />
      )}
    </div>
  );
};

export default Authentication;
