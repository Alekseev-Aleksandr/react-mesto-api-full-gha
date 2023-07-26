import { useContext } from "react";
import { UserInfoContext } from "../context/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(UserInfoContext)
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`)

    function handleLikeClick(){
        onCardLike(card)
    }

    function handleClick() {
        onCardClick(card);
    }

    function handleCardDelete(){
        onCardDelete(card._id)
    }
    return (

        <div className="card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <h2 className="card__capture">{card.name}</h2>

            <div className="card__likes-container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                <span className="card__count-likes">{card.likes.length}</span>
            </div>

            {isOwn && <button className="card__trash-button" type="button" onClick={handleCardDelete}></button>}
        </div>

    )
}
export default Card