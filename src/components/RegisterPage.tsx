import { useState } from 'react';
import styles from '../styles/RegisterPage.module.scss';
import Input from './Input';
import Button from './Button';
import FormField from './FormField';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      newErrors.name = "Введите имя";
    }

    if (!email) {
      newErrors.email = "Введите email";
    }

    if (!password) {
      newErrors.password = "Введите пароль";
    } else if (password.length < 8) {
      newErrors.password = "Пароль должен содержать минимум 8 символов";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className={styles['register']}>
      <div className={styles['register-page']}>
        <h1 className={styles['register-page__title']}>Регистрация</h1>
        <div className={styles['register-page__signup']}>
          <p>Есть аккаунт?</p>
          <Link to={"/login"}>Войти</Link>
        </div>
        <FormField error={errors.name}>
          <Input
            type="text"
            placeholder="Укажите ваше имя"
            value={name}
            onChange={setName}
          />
        </FormField>
        <FormField error={errors.email}>
          <Input
            type="email"
            placeholder="Укажите Email"
            value={email}
            onChange={setEmail}
          />
        </FormField>
        <FormField error={errors.password}>
          <Input
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={setPassword}
          />
        </FormField>
        <FormField error={errors.confirmPassword}>
          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={setConfirmPassword}
            />
          </FormField>
    
        <Button type="submit">Зарегистрироваться</Button>
      </div>
    </form>
  );
}

export default RegisterPage;