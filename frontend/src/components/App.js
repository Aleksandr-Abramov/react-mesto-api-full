import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.jsx";

function App() {
  const [isEditProfilePopupOpen, setProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isToltipPopupOpen, setToltipPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [avatarLink, setAvatarLink] = useState("");
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const [emainText, setEmailTex] = useState("");
  const [toltipMessage, setToltipMessage] = useState(true);
  const history = useHistory();

  /**
   * Основной функционал сайта.
   */
  /**
   * Получает информацию о пользователе при загрузки, заполняет карточки
   */

  React.useEffect(() => {
    if(!loggedIn) {
      return;
    }
    api
      .getInfoUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmailTex(res.email);
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    api
      .getInitialCards()
      .then((res) => {
        if (res) {
          setCards(res);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, [loggedIn]);

  /**
   * Ставит/удаляет лайк.
   */
  function handleCardLike(card, like) {
    api
      .changeLikeCardStatus(card._id, !like)
      .then((newCard) => {
        // setCards((state) => 
        //   state.map((c) => (c._id === card._id ? newCard : c))
        // );
        setCards((state) => {
          // console.log(state.map((c) => (c._id === card._id ? newCard : c)));
          // console.log(state[0].likes);
          return state.map((c) => (c._id === card._id ? newCard : c))
        })
      })
      .catch((err) => console.log(`Ошибка при попытки поставить лайк:${err}`));
  }
  /**
   * закрывает все попапы.
   */
  function closeAllPopups() {
    setProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard({ name: "", link: "" });
    setToltipPopupOpen(false);
  }
  function handleToltipPopupOpen() {
    if (isToltipPopupOpen === false) {
      setToltipPopupOpen(true);
    }
  }

  function handleEditProfileClick() {
    if (isEditProfilePopupOpen === false) {
      setProfileOpen(true);
    }
  }
  function handleEditAvatarClick() {
    if (isEditAvatarPopupOpen === false) {
      setEditAvatarOpen(true);
    }
  }
  function handleAddPlaceClick() {
    if (isAddPlacePopupOpen === false) {
      setAddPlaceOpen(true);
    }
  }

  function handleCardClick(card) {
    if (selectedCard) {
      setSelectedCard(card);
    }
  }
  /**
   * Обновляет данные пользователя, очищает поля при открытии.
   */
  function handleUpdateUser({ name, about }) {
    api
      .changeInfoUser({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }
  /**
   * Добовляет новую карточку пользователя.
   */
  function handleAddCard({ name, link }) {
    api
      .createCard({ name, link })
      .then(function (card) {
        // console.log(...card);
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }
  /**
   * Обновляет аватарку.
   */
  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setAvatarLink(res.avatar);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }
  /**
   * удаляет карточку пользователя.
   */
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => {
          return prevState.filter(function (element) {
            return element._id !== card._id;
          });
        });
      })
      .catch((err) =>
        console.log(`Ошибка при получении данных пользователя:${err}`)
      );
  }
  /**
   * регистрирует нового пользователя, редирект signin.
   * показывает сообщение успех/неудача.
   */
  function handleCreateUser(registerUserData) {
    api
      .registerUser(registerUserData)
      .then((res) => {
        setToltipMessage(true);
        handleToltipPopupOpen();
        history.push("signin");
      })
      .catch((err) => {
        setToltipMessage(false);
        handleToltipPopupOpen();
        console.log(`Ошибка при сохранении токена:${err}`);
      });
  }
  /**
   * Проверка email/pass вход на сайт, редирект /.
   * показывает сообщение успех/неудача.
   */
  function hendleLogin(registerData) {
    api
      .autorizationUser(registerData)
      .then((res) => {
        setLoggedIn(true);
        window.localStorage.setItem("loggedIn", true);
        history.push("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setToltipMessage(false);
        handleToltipPopupOpen();
        console.log(`Не правильные email или password: ${err}`);
      });
  }
  /**
   * выход, удаление куки.
   */
  function exitSite() {
    api.deleteCookie().then((res) => {
      setLoggedIn(false);
      setEmailTex("");
      window.localStorage.setItem("loggedIn", false);
      history.push("/signin");
    });
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <CurrentUserContext.Provider value={currentUser}>
            <Header emailText={emainText}>
              <Link
                to="/signin"
                className="registration__link-header"
                onClick={exitSite}
              >
                Выйти
              </Link>
            </Header>
            <ProtectedRoute
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              avatarLink={avatarLink}
              onCardDelete={handleCardDelete}
              cards={cards}
              handleCardLike={handleCardLike}
              component={Main}
              loggedIn={loggedIn}
            />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              closePopup={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              closePopup={closeAllPopups}
              createCard={handleAddCard}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupWithForm
              title="Вы уверены?"
              name="popup_delete"
              modClassForm="popup__form_height"
              btnText="Да"
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </Route>
        <Route exact path="/signup">
          <Header pathLink="signin" textLink="Войти">
            <Link to="/signin" className="registration__link-header">
              Войти
            </Link>
          </Header>
          <Register createUser={handleCreateUser} />
        </Route>
        <Route exact path="/signin">
          <Header>
            <Link to="/signup" className="registration__link-header">
              Регистрация
            </Link>
          </Header>
          <Login getRegisterData={hendleLogin} />
        </Route>
      </Switch>
      <InfoTooltip
        status={toltipMessage}
        isOpen={isToltipPopupOpen}
        closePopup={closeAllPopups}
      />
    </div>
  );
}

export default App;
