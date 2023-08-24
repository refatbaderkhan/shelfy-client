import React from "react";
import "./style.css";
import logo from "../../../../assets/logo.png"

const NavBar = () => {

  return (
      <div className="flex fullwidth spaceBetween navBar">
        <div className="flex center menuIcon contain">
        <img src={logo} alt="Logo" className=""/> 
        </div>

      </div>
  );
};

export default NavBar;
