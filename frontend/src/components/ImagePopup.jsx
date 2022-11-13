function ImagePopup({ card, onClose }) {
  const className = `${card.link ? "popup_isOpen" : ""}`;
  return (
    <div className={`popup ${className}`} id="popup_place">
      <div className="popup__place-container">
        <img src={card.link} className="popup__place-image" alt={card.name} />
        <button className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__place-name">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
