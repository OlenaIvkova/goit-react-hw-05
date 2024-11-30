import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const options = {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8',
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;