import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-popup"
      modClassForm="popup__form_height"
      btnText="Сохранить"
      isOpen={isOpen}
      closePopup={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="popup__link-avatar"
        className="popup__input popup__input_link_js"
        name="link"
        placeholder="Ссылка на картинку"
        ref={inputRef}
      />
      <span className="popup__link-avatar-error popup__input-error popup__input-error_margin">
        поле необходимо заполнить
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
