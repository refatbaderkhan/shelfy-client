import React, {useState } from "react";
import LandingTabs from "../../components/ui/LandingTabs";
import DiscoverTab from "../../components/tabs/DiscoverTab";
import ProfileTab from "../../components/tabs/ProfileTab";
import SearchTab from "../../components/tabs/SearchTab";


const Landing = () => {

  const [selectedTab, setSelectedTab] = useState(null);

  return (
    <div className="flex column page">
      <LandingTabs onTabChanged={(value) => setSelectedTab(value)} />
      {selectedTab === "Discover" && (
        <div>
          <DiscoverTab />
        </div>
      )}
      {selectedTab === "Profile" && (
        <div>
          <ProfileTab />
        </div>
      )}
      {selectedTab === "Search" && (
        <div>
          <SearchTab />
        </div>
      )}
    </div>
  );
};

export default Landing;
