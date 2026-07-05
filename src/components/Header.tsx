import '../styles/Header.css'
import Search from './Search'

function Header() {

  return (
    <>
    <header className="header">
        <div className="container header__container">
            <div className="logo">
                <img src="/logo.svg" alt="logo"/>
            </div>

            <Search />
            
            <div className="header__profile">
                <img src="/profile.jpg" className="avatar" alt="avatar" />
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
