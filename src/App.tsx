import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import './index.css';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
