import styles from '../styles/Dropdown.module.scss';
import { useState } from 'react';

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function Dropdown({ value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['dropdown__container']}>

      <button 
        className={styles['dropdown__button']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
      </button>


      {isOpen && (
        <div className={styles['dropdown__container-open']}>

          {options.map((option) => (
            <button 
              className={`${styles['dropdown__button']} ${styles['dropdown__button-option']}`}
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dropdown;