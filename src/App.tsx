import React, { useEffect, useState } from 'react';
import './App.css';
import video from './assets/video.mp4';
import moment from 'moment';
import 'moment/locale/es';

function App() {

  const [currentTime, setCurrentTime] = useState<string>(moment().format('LTS'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('LTS'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className='video-container'>
        <video src={video} autoPlay loop muted></video>
      </div>
      <h1 className='logo'>TimeTracker</h1>
      <p>{currentTime}</p>
    </div>
  );
}

export default App;
