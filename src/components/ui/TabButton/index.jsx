import React from "react";
import "./style.css";

const TabButton = ({ name, value, selected, icon, onSelected, style }) => {
  const clickHandler = () => {
    onSelected(value);
  };

  return (
    <div
      className={`flex column roundedMedium pointer tabButton${style} ${selected ? `marked${style}` : ""}`}
      onClick={() => clickHandler()}
    >
      {icon}
      <p>{name}</p>

      {selected && <div className={`selectedMark${style}`}></div>}
    </div>
  );
};

export default TabButton;
