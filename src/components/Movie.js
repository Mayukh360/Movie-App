import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      {/* <button onClick={() => props.onDeleteMovie(props.id)}>Delete</button> */}
      <button onClick={() => props.onDeleteMovieHandler(props.id)}>Delete</button>

    </li>
  );
};

export default Movie;
