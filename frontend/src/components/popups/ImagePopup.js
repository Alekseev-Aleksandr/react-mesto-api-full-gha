import { useContext } from "react"
import usePopupClose from "../../hooks/usePopupClose"
import { AppContext } from "../../context/AppContext"

function ImagePopup({ isOpen, card }) {

    const {closeAllPopups: onClose} = useContext(AppContext)

    usePopupClose(isOpen, onClose)

    return (
        <section className={`popup popup-show-card-image ${isOpen ? 'popup_opened' : ''}`}>

            <div className="popup__wrapper popup__card-image-wrapper">
                <button className="popup__button popup__button_type_close" onClick={onClose} type="button"></button>
                <img className="popup__full-image" src={`${card.link}`} alt={`${card.name}`} />
                <p className="popup__full-image-capture">{`${card.name}`}</p>
            </div>

        </section>
    )
}

export default ImagePopup