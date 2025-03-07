import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AlbumDetailsPage from './pages/AlbumDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/album/:id" element={<AlbumDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;