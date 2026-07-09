import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import BooksPage from './BooksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App