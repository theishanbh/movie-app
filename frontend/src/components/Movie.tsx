import { Fragment } from "react";
// import axios from "axios";
import "./movie.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Movie = (props: any) => {
  return (
    <Fragment>
      <div className="movie">
        <div className="movie__image__container">
          {props.image == null ? (
            <img
              src="https://www.medstartr.com/main/images/no-image.png"
              alt="no img"
              className="movie__img"
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${props.image}`}
              alt="no img"
              className="movie__img"
            />
          )}
        </div>
        <div className="movie__info__container">
          <span className="movie__title">{props.title}</span>
          <div className="movie__date">
            <img src="./Assets/Images/dateicon.png" alt="date icon" />
            <div> {props.date}</div>
          </div>
          <div className="movie__rating">
            <img src="./Assets/Images/staricon.png" alt="star icon" />
            <div> {props.vote_average}</div>
          </div>
          <div className="movie__vote__count">
            <img src="./Assets/Images/personicon.png" alt="star icon" />
            <div> {props.vote_count}</div>
          </div>
          {props.watched ? (
            <input
              type="button"
              value="ADD TO WATCHED"
              //   onClick={handleWatched}
              className="button__green"
            />
          ) : (
            <input
              type="button"
              value="REMOVE"
              //   onClick={handleRemove}
              className="button__red"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Movie;
