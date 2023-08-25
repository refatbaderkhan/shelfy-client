import React, { useState } from "react";
import "./style.css";
import TabButton from "../TabButton";

const SearchTabs = ({ onTabChanged }) => {
  
  const [selectedTab, setSelectedTab] = useState("Title");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row center fullWidth searchTabs">
      <TabButton
        name={"Title"}
        selected={selectedTab === "Title"}
        value={"Title"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"Author"}
        selected={selectedTab === "Author"}
        value={"Author"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
        <TabButton
        name={"Genre"}
        selected={selectedTab === "Genre"}
        value={"Genre"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default SearchTabs
;
