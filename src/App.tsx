import React from 'react';
import './App.css'; 
import video from './assets/video.mp4';

function App() {
  return (
    <div>
     <div className='banner'>
      <video src={video} autoPlay loop muted></video>
     </div>
      <h1 className='logo'>TimeTracker</h1>
    </div>
  );
}

export default App;
