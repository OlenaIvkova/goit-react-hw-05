import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8',
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value;
    setSearchParams(value ? { query: value } : {});
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search movies"
          name="query"
          defaultValue={query}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;