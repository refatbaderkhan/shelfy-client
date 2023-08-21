import React from "react";
import "./style.css";

const BookCard = ({ book }) => {
  return (
    <div class="flex column placeCard">
      <div class="rounded imagePlace">
        <img src={book.picture_url} alt="Place" />
      </div>
      <div class="placeDetails">
        <p class="strong">
          {book.title}, {book.author}
        </p>
        <p class="secondary">{book.review}</p>
        <p class="underline">
          <span class="bold"> {book.createdAt} $ </span> Total
        </p>
      </div>
    </div>
  );
};

export default BookCard;
