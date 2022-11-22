class Api {
  constructor(baseUrl) {
    // this._token = token;
    this._baseUrl = baseUrl;

    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getRequest({ url, method = "POST", data }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        // ...(!!token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
      ...(!!data && { body: JSON.stringify(data) }),
    }).then(this._getJsonOrError);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      // authorization: this._token,
      "content-type": "application/json",
    };
  }

  register(email, password) {
    return this._getRequest({ url: "/signup", data: { email, password } });
  }

  authorize(email, password) {
    return this._getRequest({ url: "/signin", data: { email, password } });
  }

  logout() {
    return this._getRequest({ url: "/signout", method: "GET" })
  }

  getContent() {
    return this._getRequest({ url: "/users/me", method: "GET" });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
      credentials: 'include',
    }).then(this._getJsonOrError);
  }

  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._getJsonOrError);
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getJsonOrError);
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
      credentials: 'include',
    }).then(this._getJsonOrError);
  }

  changeLikeCardStatus(id, isNotLiked) {
    if (isNotLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
        credentials: 'include',
      }).then(this._getJsonOrError);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
        credentials: 'include',
      }).then(this._getJsonOrError);
    }
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getJsonOrError);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then(this._getJsonOrError);
  }
}

const api = new Api(
  // "https://api.shchegolef.nomoredomains.club",
  "http://localhost:3000",
);

export default api;
