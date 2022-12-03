import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Browse from './components/Browse';
import { getAbilities } from './store/abilitySlice';
import { getItems } from './store/itemSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getAbilities());
      dispatch(getItems());
    })();
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/browse' element={<Browse />} />
      </Routes>
    </Router>
  );
}

export default App;
