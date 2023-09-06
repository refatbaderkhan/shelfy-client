import React from "react";
import "./style.css";

const Button = ({ text, color, textColor, onClick, style, enabled = true }) => {
  const clickHandler = () => {
    if (enabled) {
      onClick();
    }
  };

  const combinedClassName = `baseButton${style === "Alternative" ? "Alternative" : (style === "Alternative2" ? "Alternative2" : "")}`;

  console.log('2',combinedClassName)

  return (
    <button
      className={` ${combinedClassName} pointer ${color} d-text`}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default Button;
