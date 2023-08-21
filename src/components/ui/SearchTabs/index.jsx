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

const SearchTabs
 = ({ onTabChanged }) => {
  const [selectedTab, setSelectedTab] = useState("Title");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row fullWidth landingTabs">
      <TabButton
        name={"Title"}
        selected={selectedTab === "Title"}
        value={"Title"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Author"}
        selected={selectedTab === "Author"}
        value={"Author"}
        onSelected={(value) => selectHandler(value)}
      />
        <TabButton
        name={"Genre"}
        selected={selectedTab === "Genre"}
        value={"Genre"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Keyword"}
        selected={selectedTab === "Keyword"}
        value={"Keyword"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default SearchTabs
;
