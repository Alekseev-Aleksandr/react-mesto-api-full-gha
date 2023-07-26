import { useContext } from "react"
import Card from "./Card.js"
import { UserInfoContext } from "../context/CurrentUserContext"

function Main(props) {
    const userInfo = useContext(UserInfoContext)

    return (
        <main className="main">

            <section className="profile">

                <button className="profile__button profile__button_type_edit-avatar" onClick={props.onEditAvatar}>
                    <img className="profile__avatar-image" src={userInfo.avatar} alt="Аватар" />
                </button>

                <div className="profile__info">
                    <div className="profile__first-name">
                        <h1 className="profile__info-title">{userInfo.name}</h1>
                        <button className="profile__button profile__button_type_edit-info" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__info-subtitle">{userInfo.about}</p>
                </div>

                <button className="profile__button profile__button_type_add-card" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="photo-grid" aria-label="Посты">

                {
                    props.cards.map((el) => (
                        <Card card={el}
                            key={el._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete} />
                    ))
                }

            </section>

        </main>
    )

}

export default Main