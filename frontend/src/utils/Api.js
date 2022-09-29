import { apiUrls} from "./utils";

class Api {
  constructor(apiUrls) {
    this._url = apiUrls.url;
  }
  thenFunction(res) {
    if (res.ok) {
      return res.json();
    }
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
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //создание карточек
  createCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: {
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
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //поставить лайк
  // setLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     credentials: 'include',
  //     method: "PUT",
  //     headers: {
  //       // authorization: this._token,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => this.thenFunction(res));
  // }
  //удалить лайк
  // deleteLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     credentials: 'include',
  //     method: "DELETE",
  //     headers: {
  //       // authorization: this._token,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => this.thenFunction(res));
  // }
  //поставить/удалить лайк
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
  //регистрация токена в системе
  registerUser({ email, password }) {
    return fetch(`${this._url}/sign-up`, {
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
    return fetch(`${this._url}/sign-in`, {
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
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }

  //удалить куку
  deleteCookie() {
    return fetch(`${this._url}/exit`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this.thenFunction(res));
  }
}

const api = new Api(apiUrls);
export default api;
