import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from '../../common/apis/movieApi';
import { ApiKey } from "../../common/apis/movieApiKey";
const Home = () => {
  useEffect(() => {
    const movieText = 'Harry'
    const fecthMovies = async () => {
      const response = await movieApi.get(`?ApiKey=${ApiKey}&s=${movieText}&type=movie`).catch((err)=>{
        console.log('err', err)
      });
      console.log(response)
    };
    fecthMovies()
  }, []);
  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
};

export default Home;
