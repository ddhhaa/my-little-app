import BooksPage from './BooksPage.tsx'
import BookPage from './BookPage.tsx'
import Header from './Header.tsx'
import Dropdown from './Dropdown.tsx'
import { useState } from 'react'
import Button from './Button.tsx'

function App() {
  const [status, setStatus] = useState("Добавить в закладки");

  return (
    <>
      <Header />

      <Button>Login</Button>

      <Dropdown
        value={status}
        options={[
          "Добавить в закладки",
          "В планах",
          "Читаю",
          "Прочитано",
        ]}
        onChange={setStatus}
      />

      <BooksPage />
      <BookPage />
    </>
  );
}

export default App