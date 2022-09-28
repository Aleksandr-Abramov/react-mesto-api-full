import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import trashIcon from "../images/svg/Trash.svg";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userData = React.useContext(CurrentUserContext);
  const isOwn = card.owner === userData._id;
  const cardDeleteButtonClassName = `gallery__trash ${
    isOwn ? "" : "gallery__trash_hidden"
  }`;
  const isLiked = card.likes.some((i) => i === userData._id);
  const cardLikeButtonClassName = `gallery__like ${
    isLiked ? "gallery__like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function hendelClick() {
    onCardClick(card);
  }

  return (
    <div className="gallery__item">
      <img
        className="gallery__img"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={hendelClick}
      />
      <img
        className={cardDeleteButtonClassName}
        src={trashIcon}
        onClick={handleDeleteClick}
        alt="удалить"
        disabled
      />
      <div className="gallery__text-wrapper">
        <h2 className="gallery__text">{card.name}</h2>
        <div className="gallery__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="gallery__like-text"></span>
        </div>
      </div>
    </div>
  );
}
export default Card;
