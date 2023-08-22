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

const LandingTabs = ({ onTabChanged }) => {
  const [selectedTab, setSelectedTab] = useState("Feed");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row center fullWidth landingTabs">
      <TabButton
        name={"Feed"}
        selected={selectedTab === "Feed"}
        value={"Feed"}
        style={"Primary"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Discover"}
        selected={selectedTab === "Discover"}
        value={"Discover"}
        style={"Primary"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Search"}
        selected={selectedTab === "Search"}
        value={"Search"}
        style={"Primary"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Profile"}
        selected={selectedTab === "Profile"}
        value={"Profile"}
        style={"Primary"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default LandingTabs;
