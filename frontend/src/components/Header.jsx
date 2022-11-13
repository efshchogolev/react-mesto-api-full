import { Link, Routes, Route } from "react-router-dom";
import logoPath from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Логотип Mesto" />
      <div className="header__container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{props.email}</p>
                <p className="header__text" onClick={props.onLogout}>
                  Выйти
                </p>
              </>
            }
          />
          <Route
            path="sign-in"
            element={
              <p className="header__text">
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </p>
            }
          />
          <Route
            path="sign-up"
            element={
              <p className="header__text">
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              </p>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
export default Header;
