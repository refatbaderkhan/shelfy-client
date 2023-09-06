import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import SearchTabs from "../../ui/SearchTabs";
import Button from "../../base/Button";
import Input from "../../base/Input";
import "./style.css";


const SearchTab = () => {

  const [selectedSearchTab, setSelectedSearchTab] = useState("Title");;
  const [selectedSearchRoute, setSelectedSearchRoute] = useState("Title");;
  const [searchEntry, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);


  useEffect(() => {
    if (selectedSearchTab === "Title") {
      setSelectedSearchRoute("books/title/");
    } else if (selectedSearchTab === "Author") {
      setSelectedSearchRoute("books/author/");
    } else if (selectedSearchTab === "Genre") {
      setSelectedSearchRoute("books/genre/");
    }
  }, [selectedSearchTab]);

  const searchHandler = async () => {

    try {
      const response = await sendRequest({
        method: requestMethods.GET,
        route: selectedSearchRoute + searchEntry,
      });

      if (response.message == "No matches.") {
        setSearchResult([]);
      } else {
        const responseWithPicture = response.map(book => ({
          ...book,
          book_picture_url: book.picture_url
            ? `http://127.0.0.1:8000/uploads/${book.picture_url}`
            : 'theres no cover picture', 
        }));
        setSearchResult(responseWithPicture);
      }

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex column page">
          <SearchTabs onTabChanged={(value) => setSelectedSearchTab(value)} />
          <div className="searchbar center flex">
          <Input
            placeholder={"Search for something here..."}
            onChange={(Search) => setSearch(Search)}
          />
          <div className="sp-text "> _______ </div>
          <Button
            color={"medium-bg"}
            textColor={"dark-text"}
            style={"Alternative2"}
            text={"Search"} 
            onClick={() => searchHandler()}
          />
          </div>
          <br></br>
          {searchResult !== null && (
            searchResult.length > 0 ? (
              <div className="flex spaceBetween wrap pagecontainer ">
                {searchResult.map((book) => {
                  return(
                    <div className="book-card-wrapper">
                  <BookCard key={book._id} book={book} />
                  </div>
                  )
                  })}
              </div>
            ) : (
            searchResult.length === 0 && (
              <div className="flex wrap">
                no matches
              </div>
            ))
          )}
        </div>
  );
};

export default SearchTab;
