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
                headers: this._headers,
                credentials: 'include'
            })

    }

    getUserInfo() {
        return this._request(`/users/me`,
            {
                method: "GET",
                credentials: 'include',
                headers: this._headers,
            })
    }

    editProfileInfo(data) {
        return this._request(`/users/me`,
            {
                method: "PATCH",
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(
                    {
                        name: data.name,
                        about: data.about,
                    }
                )
            }
        )
    }

    addNewCard(data) {

        return this._request(`/cards`,
            {
                method: "POST",
                credentials: 'include',
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
                credentials: 'include',
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
                credentials: 'include',
                headers: this._headers,
            }
        )
    }

    addLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`,
            {
                method: "PUT",
                credentials: 'include',
                headers: this._headers,
            })
    }

    removeLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`,
            {
                method: "DELETE",
                credentials: 'include',
                headers: this._headers,
            })
    }
    
    logOut() {
        return this._request('/logout', {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
    }
}

export const api = new Api({
    baseUrl: 'http://localhost:4000',
    credentials: 'include',
    headers: {
        authorization: 'f2a9a4e2-fdf5-42ce-aab3-69e2f1a13e71',
        'Content-Type': 'application/json',
    }
})