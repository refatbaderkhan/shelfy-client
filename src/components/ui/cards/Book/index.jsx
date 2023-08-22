import React, { useState } from "react";
import "./style.css";
import cover from "../../../../assets/cover3.jpg";
import Button from "../../../base/Button";


const BookCard = ({ book }) => {
  const [bookDetails, setBookDetails] = useState(false)



  return (
    <div>
    <div key={book._id} class="flex column placeCard rounded medium-bg">
      <div class="imagePlace">
        <div class='rounded'>
        <img src={cover} alt="cover" />
        </div>
      </div>
      <div class="placeDetails">
        <p class="bold dark-text">
          {book.title}
          <br></br>
          <br></br>
          {book.author}
        </p>
        <p class="secondary">{book.review}</p>
        <p class="underline">
          <div>
            <Button
              color={"dark-bg"}
              textColor={"medium-text"}
              text={"Book Details"}
              onClick={()=> setBookDetails(book._id)}
            />
          </div>
        </p>
      </div>
    </div>
    {bookDetails && (
      <div className="modal">
        <div className="modal-content">
        <Button
          color={"dark-bg"}
          textColor={"medium-text"}
          text={"Close Book Details"}
          onClick={()=> setBookDetails(false)}
        />
        </div>
      </div>
    )}
    </div>
  );
};

export default BookCard;
