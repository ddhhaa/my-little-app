import '../styles/BooksPage.css'
import { books } from '../utils.ts'
// import BookCard from './BookCard.tsx'

function BookCard() {


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