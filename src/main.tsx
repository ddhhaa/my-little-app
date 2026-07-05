import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BooksPage from './BooksPage.tsx'
import BookCard from './BookCard.tsx'
import Header from './Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <BooksPage />
    <BookCard />
  </StrictMode>,
)
