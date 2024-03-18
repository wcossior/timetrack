import React, { useEffect, useState } from 'react'
import video from '../../assets/video.mp4';
import logo from '../../assets/logo.svg';
import './Banner.css';
import Clock from '../Clock/Clock';
import CurrentDate from '../CurrentDate/CurrentDate';


const Banner = () => {

    return (
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
                <Clock />
                <CurrentDate />
            </div>
            <div className='btn-container'>
                <button className='btn'>CHECK-IN</button>
                <button className='btn'>CHECK-OUT</button>
            </div>
        </div>
    )
}

export default Banner
