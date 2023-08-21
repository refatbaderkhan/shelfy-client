import React, { useEffect, useState } from "react";
import BookCard from "../../components/ui/cards/Book";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/ui/structure/NavBar";
import { sendRequest } from "../../core/config/request";
import { requestMethods } from "../../core/enums/requestMethods";
import LandingTabs from "../../components/ui/LandingTabs";

const Landing = () => {
  const navigation = useNavigate();

  const [allBooks, setAllBooks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await sendRequest({
        route: "/books",
        method: requestMethods.GET,
      });

      setAllBooks(response);
    } catch (error) {
      console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('m3lesh');
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
   <div className="flex column page">
     <LandingTabs/>
     <div className="flex wrap">
       {allBooks.map((book) => {
         return <BookCard book={book} />;
       })} 
   </div>
   </div>
  );
};

export default Landing;
