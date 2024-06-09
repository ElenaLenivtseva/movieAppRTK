import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import './MovieDetail.scss'

const MovieDetail = () => {
  const params = useParams();
  console.log(params);
  let imdbID = params.imdbId;
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
  }, [dispatch, imdbID]);
  return (
    <div className="movie-section">
      <div className="section-left">
        <div className="movie-title">{data.Title}</div>
        <div className="movie-rating">
          <span>
            IMDB Rating<b className="fa fa-star">⭐</b>: {data.imdbRating}
          </span>
          <span>
            IMDB Votes<b className="fa fa-thumbs-up">👍</b>: {data.imdbVotes}
          </span>
          <span>
            Runtime<b className="fa fa-film">🎬</b>: {data.Runtime}
          </span>
          <span>
            Year<b className="fa fa-calendar">📅</b>: {data.Year}
          </span>
          
          
        </div>
        <div className="movie-plot">
            {data.Plot}
          </div>
        <div className="movie-info">
            <div>
              <span>Director</span>
              <span>{data.Director}</span>
            </div>
            <div>
              <span>Stars</span>
              <span>{data.Actors}</span>
            </div>
            <div>
              <span>Generes</span>
              <span>{data.Generes}</span>
            </div>
            <div>
              <span>Languages</span>
              <span>{data.Language}</span>
            </div>
            <div>
              <span>Awards</span>
              <span>{data.Awards}</span>
            </div>
          </div>
      </div>
      <div className="section-right">
        <img src={data.Poster} alt={data.Title}/>
      </div>
    </div>
  );
};

export default MovieDetail;
