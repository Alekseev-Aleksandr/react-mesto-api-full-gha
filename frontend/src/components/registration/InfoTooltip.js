import { useContext } from "react"
import usePopupClose from "../../hooks/usePopupClose"
import { AppContext } from "../../context/AppContext"
import doneStatusImg from "../../images/done-status.svg"
import errStatusImg from "../../images/err-status.svg"

function InfoTooltip({ isOpen, statusImage}) {

    const { closeAllPopups: onClose } = useContext(AppContext)

    usePopupClose(isOpen, onClose)
    
    function getImage(status) {
        if (status === true)
            return (<>
                <img className="popup__image_type_auth-status" alt="done" src={doneStatusImg} />
                <h2 className="popup__name popup__name_type_auth">Вы успешно зарегистрировались!</h2>
            </>)
        return (<>
            <img className="popup__image_type_auth-status" alt="done" src={errStatusImg} />
            <h2 className="popup__name popup__name_type_auth">Что-то пошло не так! Попробуйте еще раз.</h2>
        </>)
    }
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>

            <div className="popup__wrapper">
                <button className="popup__button popup__button_type_close"
                    type="button"
                    onClick={onClose} />
                
                {getImage(statusImage)}
            </div>
        </section>
    )
}
export default InfoTooltip