class Api {
  constructor(host, token, baseUrl) {
    this._host = host;
    this._token = token;
    this._baseUrl = baseUrl;

    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getRequest({ url, method = "POST", token, data }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(!!token && { Authorization: `Bearer ${token}` }),
      },
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
      authorization: this._token,
      "content-type": "application/json",
    };
  }

  register(password, email) {
    return this._getRequest({ url: "/signup", data: { password, email } });
  }

  authorize(password, email) {
    return this._getRequest({ url: "/signin", data: { password, email } });
  }

  getContent(token) {
    return this._getRequest({ url: "/users/me", method: "GET", token });
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  createCard(card) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._getJsonOrError);
  }

  setUserAvatar(link) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getJsonOrError);
  }

  getUserInfoFromServer() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  changeLikeCardStatus(id, isNotLiked) {
    if (isNotLiked) {
      return fetch(`${this._host}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
      }).then(this._getJsonOrError);
    } else {
      return fetch(`${this._host}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
      }).then(this._getJsonOrError);
    }
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getJsonOrError);
  }

  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }
}

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-47",
  "ad5a4fe9-6249-4900-9757-39fd298866ec",
  "https://auth.nomoreparties.co"
);

export default api;
