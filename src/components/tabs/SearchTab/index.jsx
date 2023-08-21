import React, { useEffect, useState } from "react";
import BookCard from "../../../components/ui/cards/Book";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import SearchTabs from "../../ui/SearchTabs";
import Button from "../../base/Button";
import Input from "../../base/Input";



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
        setSearchResult(response);
      }

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex column page">
          <div>
          <Input
            label={"Seach"}
            placeholder={"Search for something here..."}
            onChange={(Search) => setSearch(Search)}
          />
          <Button
            color={"primary-bg"}
            textColor={"white-text"}
            text={"Search"}
            onClick={() => searchHandler()}
          />
          </div>
          <SearchTabs onTabChanged={(value) => setSelectedSearchTab(value)} />
          {searchResult !== null && (
            searchResult.length > 0 ? (
              <div className="flex wrap">
                {searchResult.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
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
