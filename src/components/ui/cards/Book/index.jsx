import React, { useEffect, useState } from "react";
import "./style.css";
import cover from "../../../../assets/cover2.jpg";
import Button from "../../../base/Button";
import { sendRequest } from "../../../../core/config/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import Details from "../../Details";


const BookCard = ({ book }) => {
  const [details, setBookDetails] = useState(false)

  const bookRoute = 'books/'

  const detailsHandler = async () => {
    try {
      const response = await sendRequest({
        method: requestMethods.GET,
        route: bookRoute + book._id
      });
    const responseWithPicture = response.map(book => ({
      ...book,
      book_picture_url: book.picture_url
        ? `http://127.0.0.1:8000/uploads/${book.picture_url}`
        : 'theres no cover picture', 
    }));
  
    setBookDetails(responseWithPicture);
  
    } catch (error) {
      console.log(error.response);
    }
    };
  
  useEffect(() => {
  }, [details]);

  return (
    <div>
      <div key={book._id} className="card-vertical">
        <div>
          <img className="img-portada" src={book.book_picture_url} alt="cover" />
        </div>
        <div className="card-vertical-text">
          <div className="title">
            <div>
              <p>Title:</p>
              <h1>{book.title}</h1>
              <div class="horizontal-line"></div>
              <p>Author:</p>
              <h1>{book.author}</h1>
              <div class="horizontal-line"></div>
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
      {details && <Details details={details} setBookDetails={setBookDetails} />}
    </div>
  );
};

export default BookCard;