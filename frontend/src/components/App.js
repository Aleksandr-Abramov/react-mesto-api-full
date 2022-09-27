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

  const [loggedIn, setLoggedIn] = useState(false);
  const [emainText, setEmailTex] = useState("");
  const [toltipMessage, setToltipMessage] = useState(true);
  const history = useHistory();

  /**
   * Основной функционал сайта.
   */
  /**
   * Получает информацию о пользователе при загрузки, заполняет карточки
   */

  // React.useEffect(() => {
    // if (!loggedIn) {
    //   api
    //     .getInfoUser()
    //     .then((res) => {
    //       console.log(res);
    //       setCurrentUser(res);
    //     })
    //     .catch((err) =>
    //       console.log(`Ошибка при получении данных пользователя:${err}`)
    //     );

    //   api
    //     .getInitialCards()
    //     .then((res) => {
    //       setCards(res);
    //     })
    //     .catch((err) =>
    //       console.log(`Ошибка при получении данных карточек:${err}`)
    //     );
    // }
  // }, [loggedIn]);

  /**
   * Ставит/удаляет лайк.
   */
  function handleCardLike(card, like) {
    api
      .changeLikeCardStatus(card._id, !like)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
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
   * регистрирует нового пользователя.
   */
  function handleRegisterUserToken(userToken) {
    api
      .registerUserToken(userToken)
      .then((res) => {
        setToltipMessage(true);
        handleToltipPopupOpen();
        history.push("sign-in");
      })
      .catch((err) => {
        setToltipMessage(false);
        handleToltipPopupOpen();
        console.log(`Ошибка при сохранении токена:${err}`);
      });
  }
  /**
   * Получает доступ к сайту, сохранят jwt, редиректит на главную страницу.
   */
  function handleGetUserToken(userToken) {
    api
      .autorizationUserToken(userToken)
      .then((res) => {
        setLoggedIn(true);
        history.push("/");
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        setLoggedIn(false);
        setToltipMessage(false);
        handleToltipPopupOpen();
        console.log(`Ошибка при получении токена:${err}`);
      });
  }
  /**
   * очищает jwt, выходит из системы, редирект на вход.
   */
  function clearLocalStoreg() {
    // setLoggedIn(false);
    // setEmailTex("");
    api
    .deleteCookie()
    .then((res) => {
      console.log(res);
    })
    // localStorage.removeItem("jwt");
    history.push("/sign-in");
  }
  /**
   * проверяет наличие токена у пользователя, редиректет на главную страницу.
   */
  function checkToken() {
    // const jwt = localStorage.getItem("jwt");
    // if (!jwt) {
    //   return;
    // }
    // setLoggedIn(true);
    // history.push("/");
    api
      // .checkToken(localStorage.getItem("jwt"))
      .checkToken()
      .then((res) => {
        if(res) {
          console.log(res);
          setEmailTex(res.email);
          setLoggedIn(true);
          history.push("/");
        }
        
      })
      .catch((err) => {
        console.log(`Ошибка при получении email:${err}`);
      });
  }
  /**
   * При открытии проверяет токен.
   */
  // React.useEffect(() => {
    // checkToken();
    // api
    // .getInfoUser()
    // .then((res) => {
    //   if(res) {

    //     console.log(res);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  // }, [loggedIn]);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <CurrentUserContext.Provider value={currentUser}>
            <Header emailText={emainText}>
              <Link
                to="/sign-in"
                className="registration__link-header"
                onClick={clearLocalStoreg}
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
        <Route exact path="/sign-up">
          <Header pathLink="sign-in" textLink="Войти">
            <Link to="/sign-in" className="registration__link-header">
              Войти
            </Link>
          </Header>
          <Register createUserToken={handleRegisterUserToken} />
        </Route>
        <Route exact path="/sign-in">
          <Header>
            <Link to="/sign-up" className="registration__link-header">
              Регистрация
            </Link>
          </Header>
          <Login getUserToken={handleGetUserToken} />
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
