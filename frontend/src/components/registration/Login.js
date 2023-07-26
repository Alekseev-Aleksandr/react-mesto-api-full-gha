import { useContext, useState } from "react"

function Login({onLogin}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    function onChange(e) {
        const { name, value } = e.target

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        onLogin(formValue)
    }

    return (
        <div className="auth">
            <h2 className="auth__head">Вход</h2>

            <form onSubmit={onSubmit}>
                <div className="form__items-wrapper">
                    <input className="form__input form__input_type_auth"
                        id="form__input-email"
                        name="email"
                        type="email"
                        required
                        minLength="2"
                        maxLength="40"
                        placeholder='Имя'
                        onChange={onChange} />

                    <span className="form__inputs-error form__input-error-email"></span>
                </div>

                <div className="form__items-wrapper">
                    <input className="form__input form__input_type_auth"
                        id="form__input-password"
                        name="password"
                        type="text"
                        required
                        minLength="2"
                        maxLength="200"
                        placeholder='Пароль'
                        onChange={onChange} />

                    <span className="form__inputs-error form__input-error-password"></span>
                </div>

                <button className="form__button form__button_type_auth"
                    type="submit" >
                    Войти
                </button>

            </form>

        </div>)
}

export default Login