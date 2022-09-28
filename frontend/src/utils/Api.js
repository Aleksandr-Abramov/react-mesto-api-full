import { apiToken, apiTokenUser } from "./utils";

class Api {
  constructor(tokenData, apiTokenUser) {
    this._url = tokenData.url;
    this._token = tokenData.token;
    this._userTokenUrl = apiTokenUser.url;
  }
  thenFunction(res) {
    if (res.ok) {
      return res.json();
    }

    // if(res.status === 401) {
      // console.log("ds");
      // return Promise.reject(`Что-то пошло не так: ${res}`);
      // return;
    // }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  /**
   * Данные пользовотеля
   */
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  /**
   * Изменение данных пользователя
   */
  changeInfoUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.thenFunction(res));
  }

  /**
   * обновить аватар
   */
  changeAvatar(linkAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: linkAvatar,
      }),
    }).then((res) => this.thenFunction(res));
  }
  /**
   * Инициализация карточек
   */
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: "GET",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //создание карточек
  createCard({ name, link }) {
    console.log(name, link);
    return fetch("http://localhost:8000/cards/", {
      credentials: 'include',
      method: "POST",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.thenFunction(res));
  }
  //удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //поставить лайк
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "PUT",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //удалить лайк
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //поставить/удалить лайк
  changeLikeCardStatus(cardId, isLiked) {
    console.log(cardId, isLiked);
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //регистрация токена в системе
  registerUser({ email, password }) {
    return fetch(`${this._userTokenUrl}/sign-up`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.thenFunction(res));
  }
  //вход в систему
  autorizationUser({ email, password }) {
    return fetch(`${this._userTokenUrl}/sign-in`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.thenFunction(res));
  }
  //запросить токен
  checkToken() {
    return fetch(`${this._userTokenUrl}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }).then((res) => this.thenFunction(res));
  }

  //удалить куку
  deleteCookie() {
    return fetch(`${this._userTokenUrl}/exit`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
}

const api = new Api(apiToken, apiTokenUser);
export default api;
