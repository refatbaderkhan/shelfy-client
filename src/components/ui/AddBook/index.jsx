import React, { useState } from "react";
import "./style.css";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { sendMultipartRequest } from "../../../core/config/sendMultipartRequest";
import { requestMethods } from "../../../core/enums/requestMethods";

const AddBook = ({ onToggle }) => {

  const [addedBook, setAddedBook] = useState({
    title: "",
    author: "",
    review: "",
    genres: [],
    picture_url: "",
  });
  const [coverPicture, setCoverPicture] = useState(null);
  const [error, setError] = useState(null);
  const [created,setCreated] = useState(null);

  const handleGenreInput = (inputValue) => {
    const genresArray = inputValue.split(" ");
    setAddedBook({
      ...addedBook,
      genres: genresArray,
    });
  };

  const addHandler = async () => {
    if (
      !addedBook.title.trim() ||
      !addedBook.author.trim() ||
      !addedBook.review.trim() ||
      addedBook.genres.length === 0 ||
      !coverPicture
    ) {
      setError("Please fill in all the fields and upload a cover picture.");
      setCreated(null);
      return;
    }

    const addedBookForm = {
      title: addedBook.title,
      author: addedBook.author,
      review: addedBook.review,
      genres: addedBook.genres,
      picture_url: coverPicture,
    };

    try {
      const response = await sendMultipartRequest({
        method: requestMethods.POST,
        route: "/books/create",
        body: addedBookForm,
      });
      setCreated(response.message)
      setError(null)
      setAddedBook({
        title: "",
        author: "",
        review: "",
        genres: [],
        picture_url: "",
      });
      setCoverPicture(null);
      
    } catch (error) {
      setError(error.response.data)
      setCreated(null)
    }
  };


  return (
  <div className="form-container">
    <div className="add-book ">
    <div className="spacer-30"></div>
      <h2>Share your Latest Read with us</h2>
      <div className="spacer-30"></div>
      <Input
        label={'Title'}
        placeholder={"Enter Book Title..."}
        onChange={(title)=>
          setAddedBook({
            ...addedBook,
            title,
          })
        }
      />
      <div className="spacer-20"></div>
      <Input
        label={'Author'}
        placeholder={"Enter your First Name..."}
        onChange={(author)=>
          setAddedBook({
            ...addedBook,
            author,
          })
        }
      />
      <div className="spacer-20"></div>
      <Input
        label={'Review'}
        placeholder={"Enter your Last Name..."}
        onChange={(review)=>
          setAddedBook({
            ...addedBook,
            review,
          })
        }
      />
      <div className="spacer-20"></div>
      <Input
        label={'Genres'}
        placeholder={"Enter book genres with leaving space between them..."}
        onChange={(genres) => handleGenreInput(genres)}
      />
      <div className="spacer-20"></div>
      <div className="label">Upload a Book Cover</div>
          <input
            className="upload"
            type="file"
            onChange={(e) => {
              if (e.target && e.target.files && e.target.files[0]) {
                setCoverPicture(e.target.files[0]);
              }
            }}
          />
      <div className="spacer-25"></div>
      {error && <p>{error}</p>}
      {created &&<p>{created}</p>}
      <div className="spacer-10"></div>
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Submit"}
        onClick={() => addHandler()}
      />
      <div className="spacer-30"></div>
    </div>
  </div>
    
  );
};

export default AddBook;
