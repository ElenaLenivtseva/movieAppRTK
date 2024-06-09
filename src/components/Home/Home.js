import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Harry";
  useEffect(() => {
    const fecthMovies = async () => {
      const response = await movieApi
        .get(`?ApiKey=${ApiKey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log("err", err);
        });
      dispatch(addMovies(response.data));
    };
    fecthMovies();
  }, []);
  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
};

export default Home;
