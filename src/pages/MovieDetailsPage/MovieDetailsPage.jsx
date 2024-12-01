import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate(); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
      })
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error(error.message));
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      { }
       <button className={styles.goBackButton} onClick={() => navigate('/')}>Go Back</button>
      {/* <button className={styles.goBackButton} onClick={() => navigate(-1)}>
        Go Back
      </button> */}

      <div className={styles.movieDetails}>
        {}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className={styles.moviePoster}
        />
        <h1 className={styles.movieTitle}>{movieDetails.title}</h1>
        <p className={styles.movieOverview}>{movieDetails.overview}</p>

        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabButton} ${activeTab === 'cast' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('cast');
              navigate('cast'); 
            }}
          >
            Cast
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('reviews');
              navigate('reviews'); 
            }}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'cast' && <MovieCast movieId={movieId} />}
        {activeTab === 'reviews' && <MovieReviews movieId={movieId} />}
      </div>
    </div>
  );
}

export default MovieDetailsPage;