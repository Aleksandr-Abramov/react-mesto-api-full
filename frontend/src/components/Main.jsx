import React from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  avatarLink,
  cards,
  handleCardLike,
  onCardDelete,
}) {
  const userData = React.useContext(CurrentUserContext);
  const srcAvararLink = `${avatarLink ? avatarLink : userData.avatar}`;

  return (
    <main className="main">
      <section className="profile page__profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={srcAvararLink}
            alt="Жак-Ив Кусто"
          />
        </div>

        <div className="profile__text-wrapper">
          <h1 className="profile__title">{userData.name}</h1>
          <p className="profile__sub-title">{userData.about}</p>
          <button
            className="profile__edit-btn"
            onClick={onEditProfile}
            type="button"
            aria-label="редактировать профиль"
          ></button>
        </div>

        <button
          className="profile__btn"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section
        className="gallery page__gallery"
        aria-label="Галерея фотографий"
      >
        {cards.map(function (item) {
          return (
            <Card
              card={item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
