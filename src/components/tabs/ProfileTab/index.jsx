import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import UserCard from "../../../components/ui/cards/User";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import ProfileTabs from "../../ui/ProfileTabs";
import AddBook from "../../ui/AddBook";





const ProfileTab = () => {
  const [selectedProfileTab, setSelectedProfileTab] = useState("My Books");

  const [MyBooks, setMyBooks] = useState([]);
  const [followings, setFollowings] = useState([]);



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
    fetchMyBooks();
    fetchFollowings();
  }, []);

  
  return (
    <div className="flex column page">
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
  );
};

export default ProfileTab;
