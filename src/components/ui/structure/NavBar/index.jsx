import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../base/Button";
import logo from "../../../../assets/logo.png"

const NavBar = () => {
  const location = useLocation();
  const navigation = useNavigate();


  return (
      <div className="flex fullwidth spaceBetween navBar">
        <div className="flex center menuIcon">
        <img src={logo} alt="Logo" /> 
        </div>

        <div className="flex center row spaceBetween">
          <Button
            color={"dark-bg"}
            textColor={"medium-text"}
            text={"Logout"}
            onClick={() => {
              localStorage.removeItem("access_token");
              navigation("/");
            }}
          />
        </div>
      </div>
  );
};

export default NavBar;
