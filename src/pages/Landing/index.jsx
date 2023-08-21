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
import ProfileTabs from "../../components/ui/ProfileTabs";
import AddBook from "../../components/ui/AddBook";
import SearchTabs from "../../components/ui/SearchTabs";
import Button from "../../components/base/Button";
import Input from "../../components/base/Input";




const Landing = () => {
  const navigation = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedDiscoverTab, setSelectedDiscoverTab] = useState("Books");
  const [selectedProfileTab, setSelectedProfileTab] = useState("My Books");
  const [selectedSearchTab, setSelectedSearchTab] = useState("Title");;
  const [selectedSearchRoute, setSelectedSearchRoute] = useState("Title");;
  const [searchEntry, setSearch] = useState("Title");
  const [searchResult, setSearchResult] = useState(null);
  const [failedResult, setFailedResult] = useState("");




  const [allBooks, setAllBooks] = useState([]);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [MyBooks, setMyBooks] = useState([]);
  const [followings, setFollowings] = useState([]);



  const fetchAllBooks = async () => {
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

  const fetchMyBooks = async () => {
    try {
      const response = await sendRequest({
        route: "/books/my",
        method: requestMethods.GET,
      });

      setMyBooks(response);
      console.log(MyBooks)
    } catch (error) {
      console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('m3lesh');
      }
    }
  };

  const fetchFollowings = async () => {
    try {
      const response = await sendRequest({
        route: "/user/following",
        method: requestMethods.GET,
      });

      setFollowings(response);
      console.log('suggestions',followings)
    } catch (error) {
      console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('m3lesh');
      }
    }
  };
  
  useEffect(() => {
    fetchAllBooks();
    fetchFollowSuggestions();
  }, []);

  useEffect(() => {
    fetchMyBooks();
    fetchFollowings();
  }, []);

  useEffect(() => {
    if (selectedSearchTab === "Title") {
      setSelectedSearchRoute("books/title/");
    } else if (selectedSearchTab === "Author") {
      setSelectedSearchRoute("books/author/");
    } else if (selectedSearchTab === "Genre") {
      setSelectedSearchRoute("books/genre/");
    }
  }, [selectedSearchTab]);

  const searchHandler = async () => {

    try {
      const response = await sendRequest({
        method: requestMethods.GET,
        route: selectedSearchRoute + searchEntry,
      });

      if (response.message == "No matches.") {
        setSearchResult([]);
      } else {
        setSearchResult(response);
      }


    } catch (error) {
      console.log(error.response);
    }
  };

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
      {selectedTab === "Profile" && (
        <div>
          <ProfileTabs onTabChanged={(value) => setSelectedProfileTab(value)} />
          {selectedProfileTab === "My Books" && (
            <div className="flex wrap">
              {MyBooks.map((book) => {
                return <BookCard book={book} />;
              })}
            </div>
          )}
          {selectedProfileTab === "Following" && (
            <div className="flex wrap">
              {followings.map((user) => {
                return <UserCard user={user} />;
              })}
            </div>
          )}
          {selectedProfileTab === "Add Book" && (
            <div className="flex wrap">
              <AddBook/>
            </div>
          )}
        </div>
      )}
      {selectedTab === "Search" && (
        <div>
          <Input
            label={"Seach"}
            placeholder={"Search for something here..."}
            onChange={(Search) => setSearch(Search)}
          />
          <Button
            color={"primary-bg"}
            textColor={"white-text"}
            text={"Search"}
            onClick={() => searchHandler()}
          />
          <SearchTabs onTabChanged={(value) => setSelectedSearchTab(value)} />
          {searchResult !== null && (
            searchResult.length > 0 ? (
              <div className="flex wrap">
                {searchResult.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
            searchResult.length === 0 && (
              <div className="flex wrap">
                no matches
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;
