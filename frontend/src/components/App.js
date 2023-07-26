import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './popups/ImagePopup.js';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { UserInfoContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import AddPlacePopup from './popups/AddPlacePopup.js';
import { AppContext } from '../context/AppContext.js';
import { ProtectedRoute } from './registration/ProtectrdRoute.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './registration/Register.js';
import Login from './registration/Login.js';
import InfoTooltip from './registration/InfoTooltip.js'
import { requestAuth, requestCheckJWT } from "../utils/MestoAuth.js";

function App() {

    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isSelectedCardPopupOpen, setIsSelectedCardPopupOpen] = useState(false)
    const [isStatusAuthPopupOpen, setIsStatusAuthPopupOpen] = useState(false)

    const [loggedIn, setLoggedIn] = useState(false)

    const [selectedCard, setSelectedCard] = useState({})
    const [statusImage, setStatusImage] = useState(false)
    const [emailUser, setEmailUser] = useState('')

    const navigate = useNavigate()

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsSelectedCardPopupOpen(false)
        setIsStatusAuthPopupOpen(false)
    }

    function handleCardClick(cardData) {
        setIsSelectedCardPopupOpen(!isSelectedCardPopupOpen)
        setSelectedCard(cardData)
    }

    function handleCardLike(card) {
        const isLike = card.likes.some(i => i._id === currentUser._id)

        if (!isLike) {
            api.addLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch(console.error)
        } else {
            api.removeLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch(console.error)
        }

    }

    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
            .then(() => setCards((state) => state.filter((card) => card._id != cardId)))
            .catch(console.error)
    }

    function handleUpdateUser(dataUs) {
        setIsLoading(true)
        api.editProfileInfo(dataUs)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(newAvatar) {
        setIsLoading(true)
        api.editAvatar(newAvatar)
            .then(setCurrentUser)
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true)
        api.addNewCard(newCard)
            .then(res => {
                setCards([res, ...cards])
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    function onRegistration(formValue) {

        requestAuth(formValue, 'signup')
            .then((res) => {
                if (res) {
                    setStatusImage(true)
                    setIsStatusAuthPopupOpen(true)
                    navigate('/sing-in', { replace: true });
                } else {
                    setStatusImage(false)
                    setIsStatusAuthPopupOpen(true)
                }
            })
            .catch((err) => {

                console.log(err);
                setStatusImage(false)
                setIsStatusAuthPopupOpen(true)
            })
    }

    function onLogOut() {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        navigate('/sign-in', { replace: true })
    }

    function checkToken() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt')

            requestCheckJWT(jwt)
                .then((res) => {
                    setLoggedIn(true)
                    navigate('/')
                    setEmailUser(res.data.email)
                })
                .catch(console.error)
        }

    }

    function onLogin(formValue) {
        requestAuth(formValue, 'signin')
            .then((jwt) => {
                if (jwt.token) {
                    localStorage.setItem('jwt', jwt.token)
                    setLoggedIn(true)
                    navigate('/', { replace: true })
                    checkToken()


                }
            })
            .catch((err) => {
                console.log(err);
                setStatusImage(false)
                setIsStatusAuthPopupOpen(true)
            })
    }

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((cards) => setCards(cards))
                .catch(console.error)
            api.getUserInfo()
                .then((userInfo) => setCurrentUser(userInfo))
                .catch(console.error)
        }
    }, [loggedIn])

    return (
        <div className="root">
            <AppContext.Provider value={{ isLoading, closeAllPopups }}>

                <Header
                    loggedIn={loggedIn}
                    email={emailUser}
                    onLogOut={onLogOut} />

                <UserInfoContext.Provider value={currentUser}>
                    <Routes>
                        <Route path='/sign-in'
                            element={<Login
                                onLogin={onLogin} />} />

                        <Route path='/sign-up'
                            element={<Register
                                onRegistration={onRegistration} />} />

                        <Route path='/*'
                            element={
                                <ProtectedRoute element={Main}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards}
                                    loggedIn={loggedIn}
                                />} />
                    </Routes>
                    <Footer />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser} />
                </UserInfoContext.Provider>

                <InfoTooltip
                    isOpen={isStatusAuthPopupOpen}
                    statusImage={statusImage} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar} />

                <ImagePopup card={selectedCard}
                    isOpen={isSelectedCardPopupOpen}
                />

            </AppContext.Provider>
        </div>
    );
}

export default App;