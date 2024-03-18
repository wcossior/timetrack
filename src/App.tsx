import React, { useEffect, useState } from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';

function App() {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('en-US', options);
  return (
    <div className="app">
      <Banner />
    </div>
  );
}

export default App;
