// import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

// const Navigation = () => {
//   return (
//     <nav className={styles.nav}>
//       <NavLink to="/" className={styles.link} activeClassName={styles.active}>
//         Home
//       </NavLink>
//       <NavLink
//         to="/movies"
//         className={styles.link}
//         activeClassName={styles.active}
//       >
//         Movies
//       </NavLink>
//     </nav>
//   );
// };

const Navigation = () => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={styles.navLink}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;