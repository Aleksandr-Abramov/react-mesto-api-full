import React, { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";

function Register({ createUser, openToltipPopup }) {
  const [registerData, setRegisterData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { ...data } = registerData;
    createUser(data);
  }

  return (
    <main className="main">
      <section className="registration">
        <h1 className="registration__title">Регистрация</h1>
        <form
          className="registration__form"
          name="registration"
          action="#"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            InputClass="registration__input"
            placeholder="Email"
            name="email"
            minlength="2"
            maxlength="40"
            value={registerData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            InputClass="registration__input"
            placeholder="Пароль"
            name="password"
            minlength="2"
            maxlength="40"
            value={registerData.password}
            onChange={handleChange}
          />
          <button
            className="registration__btn"
            name="registrationBtn"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </section>

      <Link className="registration__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}
export default Register;
