import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input";
import Button from "../../base/Button";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import { localStorageAction } from "../../../core/config/localstorage";

const AddBook = ({ onToggle }) => {
  const navigation = useNavigate();

  const [addedBook, setAddedBook] = useState({
    title: "",
    author: "",
    review: "",
    genres: "",
    picture_url: "",
  });

  const [error, setError] = useState(null);
  const [created,setCreated] = useState(null);;

    const addHandler = async () => {
    try {
      const response = await sendRequest({
        method: requestMethods.POST,
        route: "/books/create",
        body: addedBook,
      });

      console.log(response.message)
      setCreated(response.message)
      setError(null)

    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data)
      setCreated(null)
    }
  };

  return (
    <div className="flex column spaceBetween light-bg rounded authenticationBox">
      <h1>Add a New Book:</h1>
      <div className="spacer-30"></div>
      <Input
        label={'title'}
        placeholder={"Enter Book Title..."}
        onChange={(title)=>
          setAddedBook({
            ...addedBook,
            title,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'author'}
        placeholder={"Enter your First Name..."}
        onChange={(author)=>
          setAddedBook({
            ...addedBook,
            author,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'review'}
        placeholder={"Enter your Last Name..."}
        onChange={(review)=>
          setAddedBook({
            ...addedBook,
            review,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'genres'}
        placeholder={"Enter your genres..."}
        onChange={(genres)=>
          setAddedBook({
            ...addedBook,
            genres,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'picture_url'}
        placeholder={"Enter your picture_url..."}
        onChange={(picture_url)=>
          setAddedBook({
            ...addedBook,
            picture_url,
          })
        }
      />
      <div className="spacer-15"></div>
      {error && <p>{error}</p>}
      {created &&<p>{created}</p>}
      <div className="spacer-30"></div>
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Submit"}
        onClick={() => addHandler()}
      />
      <div className="spacer-10"></div>
    </div>
  );
};

export default AddBook;
