import React from "react";

function PopupWithForm({
  title,
  name,
  modClassForm,
  children,
  btnText,
  isOpen,
  closePopup,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_width">
        <form
          className={`popup__form popup__form-${name} ${
            modClassForm ? modClassForm : ""
          }`}
          action="#"
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className={`popup__title`}>{title}</h2>
          {children}
          <button className="popup__button" name="btnSubmith" type="submit">
            {btnText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть popup"
          onClick={closePopup}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
