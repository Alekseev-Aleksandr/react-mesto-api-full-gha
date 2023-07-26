import { useState } from "react"
import { Link } from "react-router-dom"


function Register({onRegistration}) {
    const [formValue, setFormValue] = useState({
        email:'',
        password:''
    })

    function onChange(e) {
        const {name, value} = e.target;

        setFormValue({
            ...formValue, 
            [name]: value
        })
    }

    function onSubmit(e){
        e.preventDefault()
        onRegistration(formValue)
    }

    return (
        <div className="auth">
            <h2 className="auth__head">Регистрация</h2>

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
                    Регистрация
                </button>
                <Link to="/sign-in" className="auth__link_type_registration">Уже зарегистрировались? Войти</Link>
            </form>

        </div>
    )
}
export default Register