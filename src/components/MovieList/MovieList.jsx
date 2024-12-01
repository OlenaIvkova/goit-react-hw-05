// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <img
              src={poster_path ? `${baseImgUrl}${poster_path}` : '/no_image.jpg'}
              alt={title}
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;