import '../styles/Button.css'

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  onClick?: () => void;
};

function Button({ children, variant = "primary" , onClick }: ButtonProps) {
  return(
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button