import React, { useState } from "react";
import "./style.css";
import TabButton from "../TabButton";


const DiscoverTabs = ({ onTabChanged }) => {
  const [selectedTab, setSelectedTab] = useState("Books");

  const selectHandler = (value) => {
    setSelectedTab(value);
    onTabChanged(value);
  };

  return (
    <div className="flex row fullWidth center discoverTabs">
      <TabButton
        name={"Books"}
        selected={selectedTab === "Books"}
        value={"Books"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
      <TabButton
        name={"People to Follow"}
        selected={selectedTab === "People to Follow"}
        value={"People to Follow"}
        style={"Alternative"}
        onSelected={(value) => selectHandler(value)}
      />
    </div>
  );
};

export default DiscoverTabs;
