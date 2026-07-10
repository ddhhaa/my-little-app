import styles from '../styles/Header.module.scss';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

function Header() {
  const [search, setSearch] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <div className={styles['logo']}>
          <img src="/logo.svg" alt="logo" />
        </div>

        <div className={styles['search__container']}>
          <div className={styles['search__wrapper']}>
            <img src="/search.svg" alt="search" className={styles['search__icon']} />
            <Input 
              type="text"
              placeholder="Найти книгу..."
              value={search}
              onChange={setSearch}
            />
            {search && (
              <img 
                src="/cancel.svg" 
                alt="clear" 
                className={styles['search__clear']}
                onClick={() => setSearch("")}
              />
            )}
          </div>
        </div>
        {user ? (
          <div className={styles["header__profile"]}>
            <Button variant="icon" href="/profile">
              <img src='/profile.jpg'></img>
            </Button>
          </div>
        ) : (
          <div className={styles["header__auth"]}>
            <Button href="/login">Вход</Button>
            <Button variant="secondary" href="/register">
              Регистрация
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;