import { Card } from '../components/Card.js';
import {
    formValidCard,
    newPopupWithImage,
    newSection,
    userInfo,
    popupConfirmDelete,
    api,
    userId
} from '../pages/index.js';


export const renderer = (cardInfo, userId) => {
    const newCard = new Card(cardInfo, userId, '.template-card',
        {
            handleCardClick,
            handleCardTrashClick,
            handleAddLikeCard,
            handleRemoveLikeCard
        }
    )

    const dataInTemplate = newCard.generateCard()
    newSection.addItem(dataInTemplate)
}

export const handleAddNewCard = function () {
    rerenderAllCardsInPage(userId)
    formValidCard.disableBtn()
}

export const handleSaveProfileInfo = function (data) {
    userInfo.setUserInfo(data.name, data.about)
}

export const handleCardClick = (image, name) => {
    newPopupWithImage.open(image, name)
}

export const handleCardTrashClick = (cardId) => {
    popupConfirmDelete.open(cardId)
}

export const handleEditAvatar = (data) => {
    userInfo.setAvatar(data.avatar)
}

export const handleAddLikeCard = (cardId) => {
    return api.addLikeCard(cardId)
}

export const handleRemoveLikeCard = (cardId) => {
    return api.removeLikeCard(cardId)

}

export const rerenderAllCardsInPage = (userId) => {
    return api.getInitialCards()
        .then(res => {
            newSection.renderAllElement(res, userId)
            return res
        })
        .catch(console.error)
}
