import styles from '../styles/Header.module.scss';
import Input from './Input';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { setSearch, clearSearch } from "../../store/searchSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const search = useSelector(
    (state: RootState) => state.search.query
  );
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
              onChange={(value) => dispatch(setSearch(value))}
            />
            {search && (
              <img 
                src="/cancel.svg" 
                alt="clear" 
                className={styles['search__clear']}
                onClick={() => dispatch(clearSearch())}
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