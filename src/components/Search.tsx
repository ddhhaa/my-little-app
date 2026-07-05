import '../styles/Search.css'

function Search() {

  return (
    <>
        <div className="header__search">
            <img src="/search.svg" alt="search"/>
            <input className="search__input" placeholder="Найти книгу..." />
            <img className="cancel" src="/cancel.svg" alt="cancel"/>
        </div>
    </>
  )
}

export default Search
