import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import UserCard from "../../../components/ui/cards/User";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import DiscoverTabs from "../../ui/DiscoverTabs";
import "./style.css";

const DiscoverTab = () => {
  const [selectedDiscoverTab, setSelectedDiscoverTab] = useState("Books");

  const [allBooks, setAllBooks] = useState([]);
  const [followSuggestions, setFollowSuggestions] = useState([]);

  const handleModify = (_id) => {
    setFollowSuggestions((prevList) =>
      prevList.filter((user) => user._id !== _id)
    );
  };

  const fetchAllBooks = async () => {
    try {
      const response = await sendRequest({
        route: "/books",
        method: requestMethods.GET,
      });

      setAllBooks(response);
    } catch (error) {
      console.log(error.response.status);
    }
  };

  const fetchFollowSuggestions = async () => {
    try {
      const response = await sendRequest({
        route: "/user/notfollowing",
        method: requestMethods.GET,
      });
  
      const responseWithPicture = response.map(user => ({
        ...user,
        profile_picture_url: user.profile_picture
          ? `http://127.0.0.1:8000/uploads/${user.profile_picture}`
          : 'theres no profile picture', 
      }));

      setFollowSuggestions(responseWithPicture);

    } catch (error) {
      console.log(error.response.status);
    }
  };

  
  useEffect(() => {
    fetchAllBooks();
    fetchFollowSuggestions();
  }, []);


  return (
    <div className="flex column page ">
      <DiscoverTabs onTabChanged={(value) => setSelectedDiscoverTab(value)} />
      {selectedDiscoverTab === "Books" && (
        <div className="flex spaceBetween wrap pagecontainer">
          {allBooks.map((book) => (
            <div className="book-card-wrapper" key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
      {selectedDiscoverTab === "People to Follow" && (
        <div className="flex justify-content-space-between wrap pagecontainer">
          {followSuggestions.length === 0 ? (
            <p>There's no suggested profiles at the moment. Please try again later.</p>
          ) : (
            followSuggestions.map((user) => (
              <div className="book-card-wrapper" key={user._id}>
                <UserCard user={user} status={'Follow'} onModify={handleModify} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DiscoverTab;
