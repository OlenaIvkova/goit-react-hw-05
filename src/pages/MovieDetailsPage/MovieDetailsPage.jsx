import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
   const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  const backLink = location.state && location.state.from ? location.state.from : '/movies';

   useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8',
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path
    ? `${baseImgUrl}${movie.poster_path}`
    : '/no_image.jpg';

  const handleGoBack = () => {
    navigate(backLink); 
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBack}>
        Go back
      </button>
      
      <div className={styles.details}>
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;