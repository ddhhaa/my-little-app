import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../utils";
import styles from '../styles/BookPage.module.scss';
import Header from "./Header";
import Dropdown from "./Dropdown";


function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find(
    (book) => book.id === Number(id)
  );

  const [status, setStatus] = useState(() => {
  const savedStatus = localStorage.getItem(
      `book-${id}`
    );

    return savedStatus || "Добавить в закладки";
  });

  if (!book) {
    return <h1>Книга не найдена</h1>;
  }

  function handleStatusChange(value: string) {
    setStatus(value);

    localStorage.setItem(
      `book-${id}`,
      value
    );
  }

  return (
    <>
      <Header />
      <div className={styles['book-page']}>
        <div className={styles['book-page__left']}>
          <button 
            className={styles['book-page__back']}
            onClick={() => navigate("/")}
          >
            ← Назад
          </button>
          <img 
            src={book.cover} 
            alt={book.title} 
            className={styles['book-cover']}  
          />

          <Dropdown
            value={status}
            options={[
              "В планах",
              "Читаю",
              "Прочитано",
            ]}
            onChange={handleStatusChange}
          />
        </div>
        

        <div className={styles['book-page__right']}>  
          <h1 className={styles['book-page__title']}>{book.title}</h1>  
          <h2 className={styles['book-page__author']}>{book.author}</h2>  
          <p className={styles['book-page__year']}>{book.year}</p>
          <p className={styles['book-page__genre']}>Жанры: {book.genres.join(", ")}</p>  
          <p className={styles['book-page__description']}>{book.description}</p>  
          <p className={styles['book-page__rating']}>⭐ {book.rating}</p>  
        </div>
      </div>
    </>
  );
}

export default BookPage;