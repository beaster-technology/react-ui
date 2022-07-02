import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>Footer aqui</footer>
    </>
  );
}

export default App;
