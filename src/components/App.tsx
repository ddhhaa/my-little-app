import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BooksPage from './BooksPage';
import BookPage from './BookPage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App