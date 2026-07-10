import { useState } from 'react';
import styles from '../styles/RegisterPage.module.scss';
import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ name, email, password, confirmPassword });
  }

  return (
    <form onSubmit={handleSubmit} className={styles['register']}>
      <div className={styles['register-page']}>
        <h1 className={styles['register-page__title']}>Регистрация</h1>
        <div className={styles['register-page__signup']}>
          <p>Есть аккаунт?</p>
          <Link to={"/login"}>Войти</Link>
        </div>
        <Input 
          type="text"
          placeholder="Укажите ваше имя"
          value={name}
          onChange={setName}
        />
        <Input 
          type="email"
          placeholder="Укажите Email"
          value={email}
          onChange={setEmail}
        />
        <Input 
          type="password"
          placeholder="Придумайте пароль"
          value={password}
          onChange={setPassword}
        />
        <Input 
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <Button href={"/"}>Зарегистрироваться</Button>
      </div>
    </form>
  );
}

export default RegisterPage;