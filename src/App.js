import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Searchbar from './components/Searchbar';
import { getAbilities } from './store/abilitySlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getAbilities());
    })();
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
