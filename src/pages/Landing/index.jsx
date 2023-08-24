import React, {useState } from "react";
import LandingTabs from "../../components/ui/LandingTabs";
import DiscoverTab from "../../components/tabs/DiscoverTab";
import ProfileTab from "../../components/tabs/ProfileTab";
import SearchTab from "../../components/tabs/SearchTab";
import FeedTab from "../../components/tabs/FeedTab";
import NavBar from "../../components/ui/structure/NavBar";


const Landing = () => {

  const [selectedTab, setSelectedTab] = useState("Feed");

  return (
    <div>
    <NavBar/>
    <div className="flex column page">
      <LandingTabs onTabChanged={(value) => setSelectedTab(value)} />
      <div>
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
      {selectedTab === "Feed" && (
        <div>
          <FeedTab />
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default Landing;
