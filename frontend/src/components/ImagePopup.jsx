import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_bg ${card.link && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__img" src={card.link} alt={card.name} />
        <h2 className="popup__name">{card.name}</h2>
        <button
          className="popup__close popup__close-image"
          type="button"
          aria-label="закрыть popup"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
