import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
      const options = {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8',
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul className={styles.castList}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={styles.castItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : '/no_image.jpg'
              }
              alt={name}
            />
            <p>
              <b>{name}</b> as {character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;