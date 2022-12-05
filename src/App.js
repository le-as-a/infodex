import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Browse from './components/Browse';
import { getAbilities } from './store/abilitySlice';
import { getItems } from './store/itemSlice';
import AbilityPage from './components/AbilityPage';
import ItemPage from './components/ItemPage';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const abilityNames = useSelector(state => state.ability.names);
  const itemNames = useSelector(state => state.item.names);

  useEffect(() => {
    (async () => {
      dispatch(getAbilities());
      dispatch(getItems());
      setLoaded(true);
    })();
  }, [dispatch])

  if (!loaded) return null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/browse' element={<Browse loaded={loaded} abilities={abilityNames} items={itemNames}  />} />
        <Route path='/ability/:abilityId' element={<AbilityPage />} />
        <Route path='/item/:itemId' element={<ItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
