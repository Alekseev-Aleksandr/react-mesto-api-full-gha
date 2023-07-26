import { useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [nameImage, setNameImage] = useState('')
    const [linkImage, setLinkImage] = useState('')
    
    useEffect(()=>{
        setNameImage('')
        setLinkImage('')
    }, [isOpen])

    function handleChangeName(e) {
        setNameImage(e.target.value)
    }

    function handleChangeLink(e) {
        setLinkImage(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({nameImage,linkImage})
    }

    return (
        <PopupWithForm title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit} >

            <div className="form__items-wrapper">
                <input className="form__input popup__input_type_firstname"
                    id="form__input-firstname"
                    name="firstname"
                    required
                    minLength="2"
                    maxLength="40"
                    placeholder='Новое место'
                    value={nameImage || ''}
                    onChange={handleChangeName} />

                <span className="form__inputs-error form__input-firstname-error"></span>
            </div>
            <div className="form__items-wrapper">
                <input className="form__input form__input_type_profession"
                    id="form__input-profession"
                    name="profession"
                    required
                    minLength="2"
                    maxLength="200"
                    placeholder='Ссылка'
                    value={linkImage || ''}
                    onChange={handleChangeLink} />

                <span className="form__inputs-error form__input-profession-error"></span>
            </div>

        </PopupWithForm>)
}
export default AddPlacePopup