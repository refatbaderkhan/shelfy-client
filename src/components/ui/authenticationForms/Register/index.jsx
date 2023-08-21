import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../base/Input";
import Button from "../../../base/Button";
import { sendRequest } from "../../../../core/config/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import { localStorageAction } from "../../../../core/config/localstorage";

const RegisterForm = ({ onToggle }) => {
  const navigation = useNavigate();

  const [registeration, setregisteration] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [created,setCreated] = useState(null);;

    const registerHandler = async () => {
    try {
      const response = await sendRequest({
        method: requestMethods.POST,
        route: "/register",
        body: registeration,
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
      <h1>Register !</h1>
      <div className="spacer-30"></div>
      <Input
        label={'username'}
        placeholder={"Enter your username..."}
        onChange={(username)=>
          setregisteration({
            ...registeration,
            username,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'first_name'}
        placeholder={"Enter your First Name..."}
        onChange={(first_name)=>
          setregisteration({
            ...registeration,
            first_name,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'last_name'}
        placeholder={"Enter your Last Name..."}
        onChange={(last_name)=>
          setregisteration({
            ...registeration,
            last_name,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'email'}
        placeholder={"Enter your Email..."}
        onChange={(email)=>
          setregisteration({
            ...registeration,
            email,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'password'}
        placeholder={"Enter your Password..."}
        type="password"
        onChange={(password)=>
          setregisteration({
            ...registeration,
            password,
          })
        }
      />
      <div className="spacer-15"></div>
      <Input
        label={'profile_picture'}
        placeholder={"Upload your Profile Picture..."}
        onChange={(profile_picture)=>
          setregisteration({
            ...registeration,
            profile_picture,
          })
        }
      />
      {error && <p>{error}</p>}
      {created &&
      <p>
        {created}
        <br></br>
        <span className="pointer primary-text" onClick={() => onToggle()}>
        Click here to login.
        </span>
      </p>}
      <div className="spacer-30"></div>
      <Button
        color={"primary-bg"}
        textColor={"white-text"}
        text={"Signup"}
        onClick={() => registerHandler()}
      />
      <div className="spacer-10"></div>
      <p className="black-text">
        Already have an account?{" "}
        <span className="pointer primary-text" onClick={() => onToggle()}>
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
