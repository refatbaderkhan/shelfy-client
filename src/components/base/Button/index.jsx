import React from "react";
import "./style.css";

const Button = ({ text, color, textColor, onClick, style, enabled = true }) => {
  const clickHandler = () => {
    if (enabled) {
      onClick();
    }
  };

  return (
    <button
      className={` baseButton pointer ${color} d-text ${style}`}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default Button;
