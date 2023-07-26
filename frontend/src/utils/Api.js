class Api {

    constructor(setFromServer) {
        this._baseUrl = setFromServer.baseUrl
        this._headers = setFromServer.headers
    }
    
    _request(url, options) {
        url = this._baseUrl + url
        return fetch(url, options)
            .then(this.chekAnswer)
    }

    chekAnswer(res) {

        if (res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return this._request(`/cards`,
            {
                method: 'GET',
                headers: this._headers
            })

    }

    getUserInfo() {
        return this._request(`/users/me`,
            {
                method: "GET",
                headers: this._headers
            })
    }

    editProfileInfo(data) {
        return this._request(`/users/me`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify(
                    {
                        name: data.name,
                        about: data.about
                    }
                )
            }
        )
    }

    addNewCard(data) {

        return this._request(`/cards`,
            {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify(
                    {
                        name: data.nameImage,
                        link: data.linkImage
                    }
                )
            }
        )
    }

    editAvatar(data) {
        return this._request(`/users/me/avatar`,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify(
                    {
                        avatar: data.linkImageAvatar
                    }
                )
            }
        )
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`,
            {
                method: "DELETE",
                headers: this._headers,
            }
        )
    }

    addLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`,
            {
                method: "PUT",
                headers: this._headers,
            })
    }

    removeLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`,
            {
                method: "DELETE",
                headers: this._headers,
            })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: 'f2a9a4e2-fdf5-42ce-aab3-69e2f1a13e71',
        'Content-Type': 'application/json'
    }
})