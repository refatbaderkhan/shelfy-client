import React, { useState } from "react";
import "./style.css";
import TabButton from "../TabButton";

const ProfileTabs = ({ onTabChanged }) => {
  
  const [selectedTab, setSelectedTab] = useState("My Books");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row center fullWidth profileTabs">
      <TabButton
        name={"My Books"}
        selected={selectedTab === "My Books"}
        value={"My Books"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Following"}
        selected={selectedTab === "Following"}
        value={"Following"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Add Book"}
        selected={selectedTab === "Add Book"}
        value={"Add Book"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default ProfileTabs;
