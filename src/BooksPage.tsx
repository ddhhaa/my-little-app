import './BooksPage.css'
// import BookCard from './BookCard.tsx'

function BookCard() {
const books = [
        {id: 1, title: 'Зона', author: 'Сергей Довлатов', year: '1982', cover: 'thumbnails/1.jpg'},
        {id: 2, title: 'Мизери', author: 'Стивен Кинг', year: '1987', cover: 'thumbnails/2.jpg'},
        {id: 3, title: 'Уловка 22', author: 'Джозеф Хеллер', year: '1961', cover: 'thumbnails/3.jpg'},
        {id: 4, title: 'Гордость и предубеждение', author: 'Джейн Остин', year: '1813', cover: 'thumbnails/4.jpg'},
        {id: 5, title: 'Старик и море', author: 'Эрнст Хемингуэй', year: '1952', cover: 'thumbnails/5.jpg'}
    ];

  return (
    <div className="books-grid">
        {books.map((book)=>
        <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} />

            <div className="book-card__overlay">
                <h3>{book.title}, {book.author}</h3>
                <p>{book.year}</p>
            </div>
        </div>
        )}
    </div>
  )
}

export default BookCard