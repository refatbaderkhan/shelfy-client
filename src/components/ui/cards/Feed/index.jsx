import React, { useEffect, useState } from "react";
import "./style.css";
import cover from "../../../../assets/cover.jpg";
import profile from "../../../../assets/profile.jpg";
import Button from "../../../base/Button";
import { sendRequest } from "../../../../core/config/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import Details from "../../Details";

const FeedCard = ({ book }) => {
  const [details, setBookDetails] = useState(null);

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Beirut",
  };

  const formattedTime = new Date(book.createdAt).toLocaleTimeString("en-US", timeOptions);

  const formattedDate = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const bookRoute = 'books/'

  const detailsHandler = async () => {
  try {
    const response = await sendRequest({
      method: requestMethods.GET,
      route: bookRoute + book._id
    });

    if (response) {
      const bookWithPicture = {
        ...response,
        book_picture_url: response.picture_url
          ? `http://127.0.0.1:8000/uploads/${response.picture_url}`
          : 'theres no cover picture', 
      };
      setBookDetails(bookWithPicture);
    }    


  } catch (error) {
    console.log(error.response);
  }
  };

  useEffect(() => {
  }, [details]);
console.log(book.user_id.profile_picture)
console.log(book.picture_url)

  return (
    <div>
      <div  className="card-container">
      <div key={book._id} className="card">
        <div>
        <img src={book.user_id.profile_picture}  alt="Profile" className="avatar-image"/>
        </div>
        <div className="card-text">
          <div className="portada">
            <img  className="img-portada" src={book.picture_url} alt="cover" />
          </div>
          <div className="title-total">
            <div className="user">{book.user_id.username} added a new book
            <div></div>
            {formattedTime} {formattedDate}</div>
            <div className="title">
                 {book.author}
              <h1> {book.title}</h1>
              <div>
              <div class="desc">
                "{book.review}"
              </div>
              <div className="button">
                <Button
                  style={"thinborder"}
                  color={"dark-bg"}
                  textColor={"medium-text"}
                  text={"Details"}
                  onClick={() => detailsHandler()}
                />
              </div>
              </div>
            </div>
          </div>
        </div>
        {details && (
        <Details details={details} setBookDetails={setBookDetails}></Details>
        )}
      </div>
      </div>
    </div>
  );
};

export default FeedCard;
