import styles from '../styles/Button.module.scss';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  href?: string;
};

function Button({ children, type="button", variant = "primary", onClick, href }: ButtonProps) {
  if (href) {
    return (
      <Link className={`${styles['btn']} ${styles[`btn--${variant}`]}`} type={type} to={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${styles['btn']} ${styles[`btn--${variant}`]}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;