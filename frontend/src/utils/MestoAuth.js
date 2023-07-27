const BASE_URL = 'http://localhost:3000/'

export const requestAuth = ({ email, password }, endPoint) => {

    return fetch(`${BASE_URL + endPoint}`, {
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
    return fetch(`${BASE_URL}users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok) return res.json()
    })
}