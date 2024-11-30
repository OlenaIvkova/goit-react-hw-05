import { useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThlM2NiOTU3YjBlZGY0NDQ3NDI1NTIyNTZmOGJlYyIsIm5iZiI6MTczMjk4ODQ3OS41MjQsInN1YiI6IjY3NGI0ZTNmNDU5M2E3ZjA1YzAxNTliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b7G3jNxo1o9CtCybLx9xnZUqQx23uP1u2cM00tqf3B8',
      },
    };

    try {
      const { data } = await axios.get(url, options);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;