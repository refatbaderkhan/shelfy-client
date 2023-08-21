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

const DiscoverTabs = ({ onTabChanged }) => {
  const [selectedTab, setSelectedTab] = useState("Books");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row fullWidth landingTabs">
      <TabButton
        name={"Books"}
        selected={selectedTab === "Books"}
        value={"Books"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"People to Follow"}
        selected={selectedTab === "People to Follow"}
        value={"People to Follow"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default DiscoverTabs;
