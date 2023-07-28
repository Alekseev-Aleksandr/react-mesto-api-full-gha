const REACT_API_URL = 'http://api.alekseev.nomoreparties.sbs' //localhost:4000

export const requestAuth = ({ email, password }, endPoint) => {

    return fetch(`${REACT_API_URL + '/' + endPoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then((res) => {
        if (res.ok) return res.json()
    })
}

export function requestCheckJWT() {
    return fetch(`${REACT_API_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok) return res.json()
    })
}