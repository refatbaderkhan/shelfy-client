import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import UserCard from "../../../components/ui/cards/User";
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

      if (response.message == "No Start following users to see their books.") {
        setFeedBooks([]);
      } else {
        setFeedBooks(response);
      }
    } catch (error) {
      console.log(error.response.status);
    }
  };

  
  useEffect(() => {
    fetchFeedBooks();
  }, []);


  return (
    <div className="flex column page">
      <div className="flex wrap">
        {feedBooks.length > 0 ? (
          feedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
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
