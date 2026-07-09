
import { useState } from 'react'
import '../styles/RegisterPage.css'
import Input from './Input'
import Button from './Button';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="register">
      <div className="register-page">
        <h1 className="register-page__title">Регистрация</h1>
        <div className="register-page__signup">
          <p>Есть аккаунт?</p>
          <Link to={"/login"}>Войти</Link>
        </div>
        <Input 
          type="text"
          placeholder="Укажите ваше имя"
          value={name}
          onChange={setName}/>

        <Input 
          type="email"
          placeholder="Укажите Email"
          value={email}
          onChange={setEmail}/>
        
        <Input 
          type="password"
          placeholder="Придумайте пароль"
          value={password}
          onChange={setPassword}/>

        <Button>Зарегистрироваться</Button>
      </div>
    </div>
    
  )
}

export default RegisterPage