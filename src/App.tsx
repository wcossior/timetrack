import React, { useEffect, useState } from 'react';
import './App.css';
import video from './assets/video.mp4';
import logo from './assets/logo.svg';
import moment from 'moment';
import 'moment/locale/es';

function App() {

  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date().toLocaleDateString('en-US', options);
  const [currentTime, setCurrentTime] = useState<string>(moment().format('LTS'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('LTS'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <div className='banner'>
        <div className='video-container'>
          <video src={video} autoPlay loop muted></video>
        </div>
        <img className='logo' src={logo} alt="logo" />
        <div className="options">
          <a className='show-tracks' href="#">Show Tracks</a>
          <button className='btn btn-signin'>SIGN-IN</button>
        </div>
        <div className='date-time-container'>
          <p className='clock'>{currentTime}</p>
          <p className='date'>{date}</p>
        </div>
        <div className='btn-container'>
          <button className='btn'>CHECK-IN</button>
          <button className='btn'>CHECK-OUT</button>
        </div>
      </div>
    </div>
  );
}

export default App;
