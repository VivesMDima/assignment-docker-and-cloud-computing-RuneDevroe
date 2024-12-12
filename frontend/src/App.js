// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnitsPage from './components/UnitsPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Welcome to the T'au Empire Database</h1>} />
          <Route path="/units" element={<UnitsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
