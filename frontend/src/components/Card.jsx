import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "place__like-button_active" : ""
  }`;

  const cardDeleteButtonClassName = `place__delete-button ${
    isOwn ? " " : "place__delete-button_hidden"
  }`;

  function handleLikeCard() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }


  return (
    <div className="place">
      <div className="place__image-container">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <img
          src={card.link}
          className="place__image"
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeCard}
          ></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
