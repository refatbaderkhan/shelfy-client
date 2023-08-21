import React, { useEffect, useState } from "react";
import BookCard from "../../components/ui/cards/Book";
import UserCard from "../../components/ui/cards/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/ui/structure/NavBar";
import { sendRequest } from "../../core/config/request";
import { requestMethods } from "../../core/enums/requestMethods";
import LandingTabs from "../../components/ui/LandingTabs";
import DiscoverTabs from "../../components/ui/DiscoverTabs";

const Landing = () => {
  const navigation = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedDiscoverTab, setSelectedDiscoverTab] = useState("Books");;
  const [allBooks, setAllBooks] = useState([]);
  const [followSuggestions, setFollowSuggestions] = useState([]);


  const fetchBooks = async () => {
    try {
      const response = await sendRequest({
        route: "/books",
        method: requestMethods.GET,
      });

      setAllBooks(response);
      console.log(allBooks)
    } catch (error) {
      console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('m3lesh');
      }
    }
  };

  const fetchFollowSuggestions = async () => {
    try {
      const response = await sendRequest({
        route: "/user/notfollowing",
        method: requestMethods.GET,
      });

      setFollowSuggestions(response);
      console.log('suggestions',followSuggestions)
    } catch (error) {
      console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('m3lesh');
      }
    }
  };
  
  useEffect(() => {
    fetchBooks();
    fetchFollowSuggestions();
  }, []);


  return (
    <div className="flex column page">
      <LandingTabs onTabChanged={(value) => setSelectedTab(value)} />
      {selectedTab === "Discover" && (
        <div>
          <DiscoverTabs onTabChanged={(value) => setSelectedDiscoverTab(value)} />
          {selectedDiscoverTab === "Books" && (
            <div className="flex wrap">
              {allBooks.map((book) => {
                return <BookCard book={book} />;
              })}
            </div>
          )}
          {selectedDiscoverTab === "People to Follow" && (
            <div className="flex wrap">
              {followSuggestions.map((user) => {
                return <UserCard user={user} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;
