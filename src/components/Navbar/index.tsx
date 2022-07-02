import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import logo from './logo.jpg';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Beaster" />
      </Link>
      <h1>Beaster</h1>
    </nav>
  );
}

export default Navbar;
