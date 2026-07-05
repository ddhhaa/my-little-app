import '../styles/BookPage.css'
import { books } from '../utils.ts'

function BookPage() {

  return (
    <div className="book-page">
        {books.map((book)=>
        <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} />

            <div className="book-card__right">
                <h3>{book.title}, {book.author}</h3>
                <p>{book.year}</p>
            </div>
        </div>
        )}
    </div>
  )
}

export default BookPage