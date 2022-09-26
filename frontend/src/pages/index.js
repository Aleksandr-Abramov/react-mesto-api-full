import "./index.css";

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
export { validateImageForm };

import {
  valndateConfig,
  buttonOpenAddImagePopup,
  buttonOpenProfilePopup,
  formProfileInputName,
  formProfileInputSubTitle,
  buttonAvatarOpen,
} from "../scripts/utils/constants.js";
import { Api } from "../scripts/components/Api";

/**
 * форма с кортинкой
 */
const validateImageForm = new FormValidator(
  valndateConfig,
  "popup__form-image"
);
validateImageForm.enableValidation();
/**
 * форма профайла
 */
const validateProfileForm = new FormValidator(
  valndateConfig,
  "popup__form-profile"
);
validateProfileForm.enableValidation();
/**
 * валидация аватара
 */
const validateAvatarForm = new FormValidator(valndateConfig, "avatar-popup");
validateAvatarForm.enableValidation();

const imagePopup = new PopupWithForm({
  selectopPopup: ".popup_add-image",
  handleFormSubmit: function (dataInputs) {
    Promise.all([api.getInfoUser(), api.createCard(dataInputs)])
      .then(function ([apiDataUser, apiDataCards]) {
        imagePopup.renderLoading(true);
        section.addItemPrepend(createCard(apiDataCards, apiDataUser));
        return [apiDataUser, apiDataCards];
      })
      .then(function () {
        setTimeout(() => {
          imagePopup.renderLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        imagePopup.close();
      });
  },
});
imagePopup.setEventListeners();

buttonOpenAddImagePopup.addEventListener("click", () => {
  validateImageForm.disableButton();
  imagePopup.open();
});

/**
 * создание попат для аватара, и открытие
 */

const avatarPopup = new PopupWithForm({
  selectopPopup: ".avatar-popup",
  handleFormSubmit: function (data) {
    api
      .changeAvatar(data.link)
      .then((res) => {
        avatarPopup.renderLoading(true);
        userInfo.setAvatar(res);
        return res;
      })
      .then(() => {
        setTimeout(() => {
          avatarPopup.renderLoading(false);
        }, 1000);
        avatarPopup.close();
      });
  },
});
avatarPopup.setEventListeners();
/**
 * открытие аватара
 */
buttonAvatarOpen.addEventListener("click", () => {
  validateAvatarForm.disableButton();
  avatarPopup.open();
});
/**
 * попап для удаления
 */
const deletePopup = new PopupWithConfirmation(".popup_delete");
deletePopup.setEventListeners();
deletePopup.setEventSubmit();
/**
 * токен, урл
 */
const apiToken = {
  token: "ef1d00c5-6a5e-45bb-b32e-7026ce848f5d",
  url: "https://nomoreparties.co/v1/cohort-43",
};
const api = new Api(apiToken);

/**
 * открытие карточки
 */
const popupImage = new PopupWithImage(".popup_bg");
/**
 * создание секции, карточки, добавление карточек
 */
const section = new Section(renderer, ".gallery");

function createCard(apiDataCards, apiDataUser) {
  const card = new Card({
    data: {
      cardData: apiDataCards,
      selector: "#gallery__item",
      dataUser: apiDataUser,
    },

    hendleCardClick: function (name, link) {
      popupImage.setEventListeners();
      return popupImage.open(name, link);
    },

    hendleCardDelete: function (data) {
      deletePopup.open();
      deletePopup.setSubmitFn = function () {
        deletePopup.renderLoading(true);
        api
          .deleteCard(data.getId())
          .then(() => {
            deletePopup.renderLoading(false);
            data.deleteCard();
            deletePopup.close();
          })
          .catch((err) => console.log(`При удалении карточки:${err}`));
      };
    },
    handleCardChangeLike: function (cardId, result) {
      if (result) {
        api
          .deleteLike(cardId)
          .then((res) => card.changeArrayLikes(res))
          .catch((err) => console.log(`Ошибка изменения статуса лайка:${err}`));
      } else {
        api
          .setLike(cardId)
          .then((res) => card.changeArrayLikes(res))
          .catch((err) => console.log(`Ошибка изменения статуса лайка:${err}`));
      }
    },
  });
  return card.generateCard();
}
function renderer(apiDataCards, apiDataUser) {
  section.addItem(createCard(apiDataCards, apiDataUser));
}

Promise.all([api.getInfoUser(), api.getInitialCards()]).then(function ([
  apiDataUser,
  apiDataCards,
]) {
  if (Boolean(apiDataUser)) {
    section.renderer(apiDataCards, apiDataUser);
  }
});

const userInfo = new UserInfo();
api
  .getInfoUser()
  .then((res) => userInfo.setUserInfo(res))
  .catch((err) => console.log(err));
/**
 * изменение данных профайла
 */
const profilePopup = new PopupWithForm({
  selectopPopup: ".popup_prifile",
  handleFormSubmit: function (dataInputs) {
    api
      .changeInfoUser(dataInputs)
      .then((apiDataUser) => {
        profilePopup.renderLoading(true);
        userInfo.setUserInfo(apiDataUser);
        return apiDataUser;
      })
      .then((apiDataUser) => {
        setTimeout(() => {
          profilePopup.renderLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profilePopup.close();
      });
  },
});
profilePopup.setEventListeners();
/**
 * открытие профайла
 */
buttonOpenProfilePopup.addEventListener("click", () => {
  formProfileInputName.value = userInfo.getUserInfo().name;
  formProfileInputSubTitle.value = userInfo.getUserInfo().about;
  validateProfileForm.disableButton();
  profilePopup.open();
});
