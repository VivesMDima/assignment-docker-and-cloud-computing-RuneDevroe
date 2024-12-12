// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
      <Link to="/" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/units" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>Units</Link>
    </nav>
  );
};

export default Navbar;
