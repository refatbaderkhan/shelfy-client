import React, { useState } from "react";
import Button from "../../../base/Button";
import axios from "axios"; // Import axios library
import { requestMethods } from "../../../../core/enums/requestMethods";
import "./style.css";

const RegisterForm = ({ onToggle }) => {
  const [registeration, setRegisteration] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  const registerHandler = async () => {
    const formDataObject = {
      username: registeration.username,
      first_name: registeration.first_name,
      last_name: registeration.last_name,
      email: registeration.email,
      password: registeration.password,
      profile_picture: profilePicture,
    };

    const formData = new FormData();

    Object.keys(formDataObject).forEach((key) => {
      formData.append(key, formDataObject[key]);
    });

    try {
      const response = await axios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type for form data
        },
      });

      setCreated(response.data.message);
      setError(null);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setCreated(null);
    }
  };

  return (
    <div className="form-container">
      <div className="register">
        <form encType="multipart/form-data"> {/* Set the enctype attribute here */}
          <div className="spacer-15"></div>
          <h1>Register</h1>
          <div className="space-15"></div>
          <input
            type="text"
            placeholder="Enter your username..."
            onChange={(e) =>
              setRegisteration({
                ...registeration,
                username: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Enter your First Name..."
            onChange={(e) =>
              setRegisteration({
                ...registeration,
                first_name: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Enter your Last Name..."
            onChange={(e) =>
              setRegisteration({
                ...registeration,
                last_name: e.target.value,
              })
            }
          />
          <input
            type="email"
            placeholder="Enter your Email..."
            onChange={(e) =>
              setRegisteration({
                ...registeration,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Enter your Password..."
            onChange={(e) =>
              setRegisteration({
                ...registeration,
                password: e.target.value,
              })
            }
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target && e.target.files && e.target.files[0]) {
                setProfilePicture(e.target.files[0]);
              }
            }}
          />
          {error && <p>{error}</p>}
          {created && (
            <p>
              {created}
              <br />
              <span className="pointer primary-text" onClick={() => onToggle()}>
                Click here to login.
              </span>
            </p>
          )}
          <div className="spacer-25"></div>
          <Button
            color={"primary-bg"}
            textColor={"white-text"}
            text={"Submit"}
            onClick={() => registerHandler()}
          />
          <div className="spacer-10"></div>
          <p className="black-text">
            Already have an account?{" "}
            <span className="pointer primary-text" onClick={() => onToggle()}>
              Login
            </span>
          </p>
          <div className="spacer-15"></div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
