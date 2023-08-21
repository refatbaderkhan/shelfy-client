import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../base/Button";

const NavBar = () => {
  const [username, setUsername] = useState("Taha");
  const location = useLocation();
  const navigation = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location.pathname]);

  return (
    show && (
      <div className="flex fullwidth spaceBetween navBar">
        <div className="flex circular center menuIcon">
          <AiOutlineMenu />
        </div>

        <div className="flex center row spaceBetween">
          <Button
            color={"primary-bg"}
            textColor={"white-text"}
            text={"Logout"}
            onClick={() => {
              localStorage.removeItem("access_token");
              navigation("/");
            }}
          />
          <div className="flex center circular primary-bg white-text userIcon">
            {username[0]}
          </div>
          <p className="black-text bold username">{username}</p>
        </div>
      </div>
    )
  );
};

export default NavBar;
