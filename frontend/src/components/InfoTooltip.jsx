import successPath from "../images/Success.png";
import failurePath from "../images/Failure.png";

function InfoTooltip({ isOpen, onClose, success }) {
  const className = `${isOpen ? "popup_isOpen" : ""}`;
  return (
    <div className={`popup ${className}`} id={`popup_info`}>
      <div className="popup__container popup__container_register">
        <button
          className="popup__close-button"
          // id={`close_${success ? 'success'}`}
          onClick={onClose}
        ></button>
        <img
          src={`${success ? `${successPath}` : `${failurePath}`}`}
          alt="Сообщение"
          className="popup__info-image"
        />
        <h2 className="popup__title popup__title_register">{`${
          success
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз!"
        }`}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
