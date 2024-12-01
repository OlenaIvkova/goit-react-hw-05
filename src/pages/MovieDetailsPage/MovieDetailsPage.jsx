import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, NavLink, Outlet } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = useRef(location.state?.from || '/');

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <button
        className={styles.goBackButton}
        onClick={() => navigate(previousLocation.current)}
      >
        Go Back
      </button>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className={styles.moviePoster}
        />
        <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
        <p className={styles.movieOverview}>{movieDetails.overview}</p>

        <nav>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              `${styles.tabButton} ${isActive ? styles.active : ''}`
            }
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              `${styles.tabButton} ${isActive ? styles.active : ''}`
            }
          >
            Reviews
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;