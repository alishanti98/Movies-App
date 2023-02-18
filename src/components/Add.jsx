import axios from "axios";
import { React, useState, useEffect } from "react";
import { ResultCard } from "./ResultCard";

function Add() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fakeApi = () => {
    const getData = axios
      .get(`https://www.omdbapi.com/?s=${searchValue}&apikey=148f7e34`)
      .then((response) => {
        if (response.data.Search) {
          setMovies(response.data.Search);
        }
      })
      .catch((error) => console.log(error));

    return getData;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("ali");
      fakeApi();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {movies.length > 0 && (
              <ul className="results">
                {movies.map((movie) => (
                  <li key={movie.imdbID}>{<ResultCard movie={movie} />}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
