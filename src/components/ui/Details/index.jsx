import React, { useEffect, useState } from "react";
import "./style.css";
import cover from "../../../assets/cover.jpg";
import Button from "../../base/Button";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";

const Details = ({ details, setBookDetails }) => {

const [like, setLike] = useState(details.isLikedByUser)

const likeRoute = 'books/like/'
const unLikeRoute = 'books/unlike/'

const likeHandler = async () => {
  try {
    const response = await sendRequest({
      method: requestMethods.POST,
      route: likeRoute + details._id
    });

    setLike(true);

  } catch (error) {
    console.log(error.response);
  }
  };

  const unLikeHandler = async () => {
    try {
      const response = await sendRequest({
        method: requestMethods.POST,
        route: unLikeRoute + details._id
      });

      setLike(false);
  
    } catch (error) {
      console.log(error.response);
    }
    };

  console.log(details)

  return (
    <div className="modal">
      <div className="modal-content">
        <div key={details._id} className="card-modal">
          <div>
            <img className="img-modal-portada" src={details.book_picture_url} alt="cover" />
          </div>
          <div className="card-modal-text">
            <div className="title-modal">
              <div>
                <p>Title:</p>
                <h1>{details.title}</h1>
                <div className="horizontal-line"></div>
                <p>Author:</p>
                <h1>{details.author}</h1>
                <div className="horizontal-line"></div>
              </div>
              <p>Genres:</p>
              <div className="genre-list">
                {details.genres.map((genre, index) => (
                  <span className="genre">
                      {index !== 0 && ", "}
                      <span className="genre">{genre.genre_name}</span>
                  </span>
                ))}
              </div>
              <div className="horizontal-line"></div>
              <p> Review:
                <br></br>
               {details.review}
               </p>
              <div className="horizontal-line"></div>
              <div className="button">
                <Button
                  style={"thinborder"}
                  color={"dark-bg"}
                  textColor={"medium-text"}
                  text={"Close"}
                  onClick={() => setBookDetails(null)}
                />
              </div>
              <div className="button">
                {like ? (
                  <Button
                    style={"thinborder"}
                    color={"dark-bg"}
                    textColor={"medium-text"}
                    text={"Unlike"}
                    onClick={() => unLikeHandler()}
                  />
                ) : (
                  <Button
                    style={"thinborder"}
                    color={"dark-bg"}
                    textColor={"medium-text"}
                    text={"Like"}
                    onClick={() => likeHandler()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;