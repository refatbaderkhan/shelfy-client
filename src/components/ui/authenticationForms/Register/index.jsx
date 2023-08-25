import React, { useState } from "react";
import Button from "../../../base/Button";
import Input from "../../../base/Input";
import { requestMethods } from "../../../../core/enums/requestMethods";
import "./style.css";
import { sendMultipartRequest } from "../../../../core/config/sendMultipartRequest";

const RegisterForm = ({ onToggleRegister }) => {
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
    const registerationForm = {
      username: registeration.username,
      first_name: registeration.first_name,
      last_name: registeration.last_name,
      email: registeration.email,
      password: registeration.password,
      profile_picture: profilePicture,
    };

    try {
    const response = await sendMultipartRequest({
      method: requestMethods.POST,
      route: "/register",
      body: registerationForm,
    });

      setCreated(true);
      setError(null);

    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setCreated(false);
    }
  };

  const isFormValid = () => {
    return (
      registeration.username.trim() !== "" &&
      registeration.first_name.trim() !== "" &&
      registeration.last_name.trim() !== "" &&
      registeration.email.trim() !== "" &&
      registeration.password.trim() !== ""
    );
  };

  return (
    <div className="form-container">
      <div className="register">
        <form encType="multipart/form-data">
          <div className="spacer-15"></div>
          <h1>Register</h1>
          <div className="space-15"></div>
          <Input
            label={"Username"}
            placeholder={"Enter you Username..."}
            onChange={(username) =>
              setRegisteration({
                ...registeration,
                username,
              })
            }
          />
          <Input
            label={"First Name"}
            placeholder={"Enter you First Name..."}
            onChange={(first_name) =>
              setRegisteration({
                ...registeration,
                first_name,
              })
            }
          />
          <Input
            label={"Last Name"}
            placeholder={"Enter you Last Name..."}
            onChange={(last_name) =>
              setRegisteration({
                ...registeration,
                last_name,
              })
            }
          />
          <Input
            label={"Email"}
            placeholder={"Enter you Email..."}
            onChange={(email) =>
              setRegisteration({
                ...registeration,
                email,
              })
            }
          />
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Enter Password..."}
            onChange={(password) =>
              setRegisteration({
                ...registeration,
                password,
              })
            }
          />
          <div className="label">Upload a profile picture</div>
          <input
            className="upload"
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
              Account Created Successfully.
              <br />
              <span className="pointer primary-text" onClick={onToggleRegister}>
                Click here to login.
              </span>
            </p>
          )}
          <div className="spacer-25"></div>
          <Button
            color={"primary-bg"}
            textColor={"white-text"}
            text={"Submit"}
            onClick={() => {
              if (isFormValid()) {
                registerHandler();
              } else {
                setError("Please fill in all the fields.");
              }
            }}
          />
          <div className="spacer-10"></div>
          <p className="black-text">
            Already have an account?{" "}
            <span className="pointer primary-text" onClick={onToggleRegister }>
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


