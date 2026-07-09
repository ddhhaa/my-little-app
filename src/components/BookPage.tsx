import { useParams } from "react-router-dom";
import { books } from "../utils";
import '../styles/BookPage.css'
import Header from "./Header";

function BookPage() {
  const { id } = useParams();

  const book = books.find(
    (book) => book.id === Number(id)
  );

  if (!book) {
    return <h1>Книга не найдена</h1>;
  }
  console.log(book.cover);

  return (
    <>
    <Header />
    <div className="book-page">
      <img src={book.cover} alt={book.title} className="book-cover" />


    <div className="book-page__right">
      <h1 className="book-page__title">{book.title}</h1>
      <h2 className="book-page__author">{book.author}</h2>
      <p className="book-page__year">{book.year}</p>

      <p className="book-page__description">{book.description}</p>

      <p className="book-page__rating">⭐ {book.rating}</p>
    </div>
      
    </div>
    </>
  );
}

export default BookPage;