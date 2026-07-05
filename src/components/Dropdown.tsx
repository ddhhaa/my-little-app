import '../styles/Dropdown.css'
import { useState } from 'react';

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function Dropdown({ value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <div className="dropdown dropdown__container">
        <button className="dropdown__button close" onClick={()=>{setIsOpen((prev) => !prev)}}>{value}</button>
        {isOpen && (
            <div className="dropdown__container__open">
                {options.map((option)=>
                <button className="dropdown__button open" key={option} onClick={()=>{
                    setIsOpen(false);
                    onChange(option);
                }}>{option}</button>
            )}
            </div>
        )}
    </div>
  )
}

export default Dropdown