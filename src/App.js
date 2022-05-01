import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth';


function App() {
  return (
    <Routes>
      <Route index path="/" element={<Auth />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
