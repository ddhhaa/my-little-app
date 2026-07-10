import { Link } from "react-router-dom";
import styles from "../styles/BookCard.module.scss";

type BookCardProps = {
  id: number;
  title: string;
  author: string;
  year: string;
  cover: string;
};

function BookCard({ id, title, author, year, cover }: BookCardProps) {
  return (
    <Link 
      to={`/books/${id}`}
      className={styles['book-card']}
    >
      <img 
        src={cover} 
        alt={title} 
      />

      <div className={styles['book-card__overlay']}>
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{year}</p>
      </div>
    </Link>
  );
}

export default BookCard;