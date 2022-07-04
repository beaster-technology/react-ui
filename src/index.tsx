import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import GameDetails from './pages/GameDetails';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path=":gameId" element={<GameDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
