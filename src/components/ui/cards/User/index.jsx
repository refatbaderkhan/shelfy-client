import React from "react";
import "./style.css";

const UserCard = ({ user }) => {
  return (
    <div class="flex column placeCard">
      <div class="rounded imagePlace">
        <img src={user.profile_picture} alt="Place" />
      </div>
      <div class="placeDetails">
        <p class="strong">
          {user.first_name}, {user.last_name}
        </p>
        <p class="secondary">books:{user.books.length}</p>
        <p class="underline">
          <span class="bold"> {user.createdAt} </span> Total
        </p>
      </div>
    </div>
  );
};

export default UserCard;
