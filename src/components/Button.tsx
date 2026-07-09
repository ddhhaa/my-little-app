import '../styles/Button.css'
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  href?: string;
};

function Button({ children, variant = "primary" , onClick, href }: ButtonProps) {
  if (href) {
    return (
      <Link className={`btn btn--${variant}`} to={href}>
        {children}
      </Link>
    );
  }
  return(
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button