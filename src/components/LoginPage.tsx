import { useState } from "react";
import styles from "../styles/LoginPage.module.scss";
import Input from "./Input";
import Button from "./Button";
import FormField from "./FormField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { login as loginRequest } from "../api/authApi";
import { login } from "../store/authSlice";


function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const newErrors = {
      email: "",
      password: "",
    };


    if (!email) {
      newErrors.email = "Введите email";
    }


    if (!password) {
      newErrors.password = "Введите пароль";
    }


    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }


    const data = await loginRequest(
      email,
      password
    );


    if (!data.ok) {

      setErrors({
        email: "",
        password: "Неверный email или пароль",
      });

      return;
    }


    localStorage.setItem(
      "token",
      data.token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );


    dispatch(
      login({
        user: data.user,
        token: data.token,
      })
    );


    navigate("/");
  }



  return (
    <form
      onSubmit={handleSubmit}
      className={styles.login}
    >

      <div className={styles["login-page"]}>

        <h1 className={styles["login-page__title"]}>
          Войти
        </h1>


        <div className={styles["login-page__signup"]}>
          <p>
            Нет аккаунта?
          </p>

          <Link to="/register">
            Зарегистрироваться
          </Link>
        </div>


        <FormField error={errors.email}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </FormField>


        <FormField error={errors.password}>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={setPassword}
          />
        </FormField>


        <Button type="submit">
          Войти
        </Button>

      </div>

    </form>
  );
}


export default LoginPage;