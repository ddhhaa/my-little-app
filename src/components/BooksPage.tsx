import '../styles/BooksPage.css'
import { books } from '../utils.ts'
import Header from './Header.tsx'
import BookCard from './BookCard.tsx'

function BooksPage() {

  return (
    <>
      <Header />

      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
          />
        ))}
      </div>
    </>
  )
}

export default BooksPage;