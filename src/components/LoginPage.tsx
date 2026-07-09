
import { useState } from 'react'
import '../styles/LoginPage.css'
import Input from './Input'
import Button from './Button';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="login-page">
        <h1 className="login-page__title">Войти</h1>
        <div className="login-page__signup">
          <p>Нет аккаунта?</p>
          <Link to={"/register"}>Зарегистрироваться</Link>
        </div>
        <Input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}/>
        
        <Input 
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={setPassword}/>

        <Button>Войти</Button>
      </div>
    </div>
    
  )
}

export default LoginPage