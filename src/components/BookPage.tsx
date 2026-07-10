import { useParams } from "react-router-dom";
import { books } from "../utils";
import styles from '../styles/BookPage.module.scss';
import Header from "./Header";

function BookPage() {
  const { id } = useParams();

  const book = books.find(
    (book) => book.id === Number(id)
  );

  if (!book) {
    return <h1>Книга не найдена</h1>;
  }

  return (
    <>
      <Header />
      <div className={styles['book-page']}>
        <img 
          src={book.cover} 
          alt={book.title} 
          className={styles['book-cover']}  
        />

        <div className={styles['book-page__right']}>  
          <h1 className={styles['book-page__title']}>{book.title}</h1>  
          <h2 className={styles['book-page__author']}>{book.author}</h2>  
          <p className={styles['book-page__year']}>{book.year}</p>  
          <p className={styles['book-page__description']}>{book.description}</p>  
          <p className={styles['book-page__rating']}>⭐ {book.rating}</p>  
        </div>
      </div>
    </>
  );
}

export default BookPage;