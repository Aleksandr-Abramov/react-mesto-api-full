import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, closePopup, createCard }) {
  const [namePlace, setNamePlace] = useState("");
  const [linkPlace, setLinkPlace] = useState("");

  function handleChangeNamePlace(e) {
    setNamePlace(e.target.value);
  }

  function handleChangelinkPlace(e) {
    setLinkPlace(e.target.value);
  }
  function addDataCard(e) {
    e.preventDefault();
    createCard({ name: namePlace, link: linkPlace });
  }

  useEffect(() => {
    setNamePlace("");
    setLinkPlace("");
  }, [isOpen, closePopup]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-image"
      btnText="Создать"
      isOpen={isOpen}
      closePopup={closePopup}
      onSubmit={addDataCard}
    >
      <Input
        id="popup__name-image"
        InputClass="popup__input popup__input_name_js"
        type="text"
        name="name"
        placeholder="Название"
        minlength="2"
        maxlength="30"
        spanText="поле необходимо заполнить"
        value={namePlace}
        onChange={handleChangeNamePlace}
      />
      <Input
        id="popup__link-image"
        InputClass="popup__input popup__input_link_js"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        spanText="поле необходимо заполнить"
        value={linkPlace}
        onChange={handleChangelinkPlace}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
