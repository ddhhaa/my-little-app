import styles from '../../styles/Input.module.scss';

type InputProps = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({ type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <input 
      className={styles['input']} 
      type={type} 
      value={value} 
      placeholder={placeholder} 
      onChange={(event) => onChange(event.target.value)} 
    />
  );
}

export default Input;