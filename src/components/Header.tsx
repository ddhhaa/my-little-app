import '../styles/Header.css'
import Search from './Search'
import Button from './Button'

function Header() {

  return (
    <>
    <header className="header">
        <div className="container header__container">
            <div className="logo">
                <img src="/logo.svg" alt="logo"/>
            </div>

            <Search />

            <div className="header__auth">
                <Button href={"/login"}>Войти</Button>
                <Button variant="secondary" href={"/register"}>Регистрация</Button>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
