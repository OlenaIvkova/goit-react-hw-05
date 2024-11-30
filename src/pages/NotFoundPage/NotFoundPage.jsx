// import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page you are looking for does not exist. Return to{' '}
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;