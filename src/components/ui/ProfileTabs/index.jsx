import React, { useState } from "react";
import "./style.css";
import TabButton from "../TabButton";
import {
  AiFillAlert,
  AiFillAliwangwang,
  AiFillAndroid,
  AiFillApi,
  AiFillApple,
} from "react-icons/ai";

const ProfileTabs = ({ onTabChanged }) => {
  const [selectedTab, setSelectedTab] = useState("My Books");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row fullWidth landingTabs">
      <TabButton
        name={"My Books"}
        selected={selectedTab === "My Books"}
        value={"My Books"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Following"}
        selected={selectedTab === "Following"}
        value={"Following"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Add Book"}
        selected={selectedTab === "Add Book"}
        value={"Add Book"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default ProfileTabs;
