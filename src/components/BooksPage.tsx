import styles from '../styles/BooksPage.module.scss';
import { books } from '../utils.ts';
import Header from './Header.tsx';
import BookCard from './BookCard.tsx';
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function BooksPage() {
  const search = useSelector(
    (state: RootState) => state.search.query
  );

  const filteredBooks = books.filter((book) => {
  const query = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Header />
      <div className={styles['books-grid']}>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

export default BooksPage;