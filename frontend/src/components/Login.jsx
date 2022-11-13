import { useState } from "react";

function Login(props) {
  const INIT_VALUES = { email: "", password: "" };
  const [state, setState] = useState(INIT_VALUES);

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

    if (!email || !password) return;

    props.onLogin(email, password).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="auth__input auth__input_password"
          placeholder="Пароль"
          type="password"
          name="password"
          value={state.value}
          onChange={handleChange}
        />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
