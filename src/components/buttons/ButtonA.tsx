import React from 'react';
import './ButtonA.css';

interface ButtonAProps {
  text: string;
  imgSrc: string;
  imgAlt: string;
}

const ButtonA: React.FC<ButtonAProps> = ({ text, imgSrc, imgAlt }) => {
  return (
    <div className='buttonA-a'>
      <img
        src={imgSrc}
        alt={imgAlt}
        className="buttonA-a-icon"
      />
      <h2>{text}</h2>
    </div>
  );
}

export default ButtonA;
