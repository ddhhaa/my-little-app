import { useState } from "react";
import styles from "../styles/RegisterPage.module.scss";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";


function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const navigate = useNavigate();



  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

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
    }


    if (password.length < 8) {
      newErrors.password =
        "Минимум 8 символов";
    }


    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Пароли не совпадают";
    }


    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }



    const data = await register(
      name,
      email,
      password
    );


    if (!data.ok) {

      setErrors({
        ...newErrors,
        email: data.error,
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


    navigate("/");
  }



  return (
    <form
      onSubmit={handleSubmit}
      className={styles.register}
    >

      <div className={styles["register-page"]}>

        <h1 className={styles["register-page__title"]}>
          Регистрация
        </h1>


        <div className={styles["register-page__signup"]}>
          <p>
            Есть аккаунт?
          </p>

          <Link to="/login">
            Войти
          </Link>
        </div>


        <FormField error={errors.name}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={setName}
          />
        </FormField>


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


        <FormField error={errors.confirmPassword}>
          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </FormField>


        <Button type="submit">
          Зарегистрироваться
        </Button>


      </div>

    </form>
  );
}


export default RegisterPage;