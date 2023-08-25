import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import UserCard from "../../../components/ui/cards/User";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import ProfileTabs from "../../ui/ProfileTabs";
import AddBook from "../../ui/AddBook";
import "./style.css";

const ProfileTab = () => {

  const [selectedProfileTab, setSelectedProfileTab] = useState("My Books");
  const [myBooks, setMyBooks] = useState([]);
  const [followings, setFollowings] = useState([]);

  const handleModify = (_id) => {
    setFollowings((prevList) =>
      prevList.filter((user) => user._id !== _id)
    );
  };

  const fetchMyBooks = async () => {
    try {
      const response = await sendRequest({
        route: "/books/my",
        method: requestMethods.GET,
      });

      const responseWithPicture = response.map(book => ({
        ...book,
        book_picture_url: book.picture_url
          ? `http://127.0.0.1:8000/uploads/${book.picture_url}`
          : 'theres no cover picture', 
      }));

      setMyBooks(responseWithPicture);

    } catch (error) {
      console.log(error.response.status);
    }
  };

  const fetchFollowings = async () => {
    try {
      const response = await sendRequest({
        route: "/user/following",
        method: requestMethods.GET,
      });

      const responseWithPicture = response.map(user => ({
        ...user,
        profile_picture_url: user.profile_picture
          ? `http://127.0.0.1:8000/uploads/${user.profile_picture}`
          : 'theres no profile picture', 
      }));


      setFollowings(responseWithPicture);
      
    } catch (error) {
      console.log(error.response.status);
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
        <div className="flex spaceBetween wrap pagecontainer">
          {myBooks.map((book) => (
            <div className="book-card-wrapper" key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
      {selectedProfileTab === "Following" && (
        <div className="flex spaceBetween wrap pagecontainer">
          {followings.length == 0 ? (
            <p>You're currently not following any user.</p>
          ) : (
            followings.map((user) => (
              <div className="book-card-wrapper" key={user._id}>
                <UserCard user={user} status={'Unfollow'} onModify={handleModify} />
              </div>
            ))
          )}
        </div>
      )}
      {selectedProfileTab === "Add Book" && (
        <div className="flex wrap">
          <AddBook />
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
