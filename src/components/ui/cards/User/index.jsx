import React, { useEffect, useState } from "react";
import "./style.css";
import profile from "../../../../assets/profile.jpg";
import Button from "../../../base/Button";
import { sendRequest } from "../../../../core/config/request";


const UserCard = ({ user , status, onModify}) => {

const[urlMethod, setUrlMethod] = useState("")
const[socialMethod, setSocialMethod] = useState(status)

useEffect(() => {
if (socialMethod === "Follow"){
  setUrlMethod("POST")
} else if (socialMethod === "Unfollow") {
  setUrlMethod("DELETE")
}
}, [socialMethod]);

const socialHandler = async () => {

  try {
    const response = await sendRequest({
      method: urlMethod,
      route: 'user/'+user._id,
    });

  onModify(user._id);

  } catch (error) {
    console.log(error.response);
  }
};


  return (
    <div className="profile-card">
      <img src={user.profile_picture_url} alt="Profile" />
      <div className="info">
        <div>
          <h1>@{user.username}</h1>
          <div class="horizontal-line"></div>
          <h1>
            {user.first_name} {user.last_name}
          </h1>
          <div class="horizontal-line"></div>
          <h1>Books: {user.books.length}</h1>
        </div>
        <div className="button-container">
          <Button
            style={"Alternative"}
            color={"dark-bg"}
            textColor={"medium-text"}
            text={status}
            onClick={() => socialHandler()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
