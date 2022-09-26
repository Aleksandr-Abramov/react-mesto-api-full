import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, closePopup, onUpdateUser }) {
  const userData = React.useContext(CurrentUserContext);
  const [name, setName] = useState({ name: "" });
  const [description, setDescription] = useState({ about: "" });

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(userData.name);
    setDescription(userData.about);
  }, [userData, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnText="Сохранить"
      isOpen={isOpen}
      closePopup={closePopup}
      onSubmit={handleSubmit}
    >
      <Input
        id="popup__name-profile"
        InputClass="popup__input popup__input_name_js"
        type="text"
        name="name"
        minlength="2"
        maxlength="40"
        placeholder="Имя"
        spanText="поле необходимо заполнить"
        value={name || ""}
        onChange={handleChangeName}
      />
      <Input
        id="popup__profession"
        InputClass="popup__input popup__input_profession_js"
        type="text"
        name="about"
        minlength="2"
        maxlength="200"
        placeholder="Профессия"
        spanText="поле необходимо заполнить"
        value={description}
        onChange={handleChangeDescription}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
