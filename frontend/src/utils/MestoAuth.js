const {
    REACT_APP_URL ,
} = process.env //localhost:4000
console.log(process.env.REACT_APP_URL);
console.log(REACT_APP_URL);

export const requestAuth = ({ email, password }, endPoint) => {

    return fetch(`${'https://api.alekseev.nomoreparties.sbs' + '/' + endPoint}`, {
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
    return fetch(`https://api.alekseev.nomoreparties.sbs/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok) return res.json()
    })
}