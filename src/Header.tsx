import './Header.css'

function Header() {

  return (
    <>
    <header className="header">
        <div className="container header__container">
            <div className="logo">
                <img src="/logo.svg" alt="logo"/>
            </div>

            <div className="header__search">
                <img src="/search.svg" alt="search"/>
                <input className="search__input" placeholder="Найти книгу..." />
                <img className="cancel" src="/cancel.svg" alt="cancel"/>
            </div>
            
            <div className="header__profile">
                <img src="/profile.jpg" className="avatar" alt="avatar" />
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
