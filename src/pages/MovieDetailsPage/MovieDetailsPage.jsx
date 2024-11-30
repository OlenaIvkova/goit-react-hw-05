// import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
//  import axios from 'axios';

function MovieDetailsPage() {
  const { movieId } = useParams(); 
  const location = useLocation(); 

  const backLink = location.state?.from ?? '/'; 

  return (
    <div>
      <h2>Movie Details: {movieId}</h2>
      
      {}
      <div className="additional-info">
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

      {}
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;