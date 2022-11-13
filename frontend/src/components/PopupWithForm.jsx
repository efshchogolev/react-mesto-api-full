function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  const className = `${isOpen ? "popup_isOpen" : ""}`;
  return (
    <div className={`popup ${className}`} id={`popup_${name}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          id={`close_${name}`}
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" id={`form_${name}`} onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_${name}`}
            id={`submit_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
