const BASE_URL = 'https://auth.nomoreparties.co/'

export const requestAuth = ({ email, password }, endPoint) => {

    return fetch(`${BASE_URL + endPoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then((res) => {
        if (res.ok) return res.json()
    })
}

export function requestCheckJWT(jwt) {
    return fetch(`${BASE_URL}users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }).then((res) => {
        if (res.ok) return res.json()
    })
}