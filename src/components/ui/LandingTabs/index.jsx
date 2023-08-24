import React, { useState } from "react";
import "./style.css";
import TabButton from "../TabButton";
import {useNavigate } from "react-router-dom";

const LandingTabs = ({ onTabChanged }) => {
  const navigation = useNavigate();

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
      <TabButton
        name={"Logout"}
        selected={selectedTab === "Logout"}
        value={"Logout"}
        style={"Primary"}
        onSelected={() => {
          localStorage.removeItem("access_token");
          navigation("/");
        }}
      />
    </div>
  );
};

export default LandingTabs;
