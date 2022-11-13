import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [state, setState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    props.onRegister(email, password);
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_email"
          placeholder="Email"
          value={state.email}
          name="email"
          onChange={handleChange}
        />
        <input
          className="auth__input auth__input_password"
          placeholder="Пароль"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="auth__button">Зарегистрироваться</button>
        <p className="auth__entrance">
          <Link className="auth__link" to="../sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
