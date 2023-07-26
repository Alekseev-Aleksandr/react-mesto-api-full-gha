import { useContext } from "react"
import usePopupClose from "../../hooks/usePopupClose"
import { AppContext } from "../../context/AppContext"

function PopupWithForm({ title, isOpen, onSubmit, children }) {

    const {isLoading, closeAllPopups: onClose} = useContext(AppContext)
    
    usePopupClose(isOpen, onClose)

    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>

            <div className="popup__wrapper">
                <button className="popup__button popup__button_type_close"
                    type="button"
                    onClick={onClose} />

                <h2 className="popup__name">{title}</h2>

                <form onSubmit={onSubmit}>
                    {children}
                    <button className="form__button form__button_type_save form__button_active"
                        type="submit" >

                        {isLoading? 'Cохранение...': 'Сохранить'}
                    </button>
                </form>

            </div>
        </section>
    )
}

export default PopupWithForm
