import './BookCard.css'

function BookCard() {

  return (
    <>
    <img src="thumbnails/1.jpg" className="book-card__image"/>

    <div className="book-card__overlay">
        <h3>Title</h3>
        <p>Author</p>
        <p>Year</p>
    </div>
    </>
  )
}

export default BookCard