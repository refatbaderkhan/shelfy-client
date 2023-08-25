import React, { useEffect, useState } from "react";
import FeedCard from "../../../components/ui/cards/Feed";
import "./style.css";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";


const FeedTab = () => {

  const [feedBooks, setFeedBooks] = useState([]);

  const fetchFeedBooks = async () => {
    try {
      const response = await sendRequest({
        route: "user/feed",
        method: requestMethods.GET,
      });

      if (response.message === "No Books to show at the moment. Start following users to see their books.") {
        setFeedBooks([]);
      } else {
        const feedBooksWithUrls = response.map(book => ({
          ...book,
          picture_url: book.picture_url
            ? `http://127.0.0.1:8000/uploads/${book.picture_url}`
            : 'no picture available', // You can change this message
          user_id: {
            ...book.user_id,
            profile_picture: book.user_id.profile_picture
              ? `http://127.0.0.1:8000/uploads/${book.user_id.profile_picture}`
              : 'theres no profile picture',
          },
        }));
        
        setFeedBooks(feedBooksWithUrls);
        console.log('b3den',feedBooks)
      }
    } catch (error) {
      console.log(error.response.status);
    }
  };

  
  useEffect(() => {
    fetchFeedBooks();
  }, []);


  return (
    <div>
      <div className="flex spaceBetween wrap pagecontainer center-cards">
        {feedBooks.length > 0 ? (
          feedBooks.map((book) => (
            <FeedCard key={book._id} book={book} />
          ))
        ) : (
          <div>
            Start following people
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedTab;
