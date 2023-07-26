import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, onLogOut, email}) {
    const location = useLocation().pathname

    function getLink() {
        if (location === '/sign-in')
            return (<Link className='header__link' to="/sign-up">Регистрация</Link>)
        else if (location === '/sign-up')
            return (<Link className='header__link' to="/sign-in">Войти</Link>)
    }

    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип" />
            {loggedIn ?
                <p>{email}<button className='header__button-logout' onClick={onLogOut}>Выйти</button></p>
                : getLink()
            }
        </header>
    )
}

export default Header