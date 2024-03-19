import React, { useEffect, useState } from 'react'
import video from '../../assets/video.mp4';
import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import './Banner.css';
import Clock from '../Clock/Clock';
import CurrentDate from '../CurrentDate/CurrentDate';

const Banner = () => {

    const [activeMenu, setActiveMenu] = useState('');

    const showMenu = () => {
        setActiveMenu('show-menu');
    }

    const hideMenu = () => {
        setActiveMenu('hide-menu');
    }


    return (
        <div className='banner'>
            <div className='video-container'>
                <video src={video} autoPlay loop muted></video>
            </div>
            <img className='logo' src={logo} alt="logo" />
            <img className='menu-icon' src={menu} alt="menu" onClick={showMenu} />
            <div className={`menu-container ${activeMenu}`}>
                <div className='menu'>
                    <img className='close' src={close} alt="close-menu" onClick={hideMenu} />
                    <p className="menu-options">Sign in</p>
                    <p className="menu-options">Show Tracks</p>
                </div>
            </div>
            <div className="options">
                <a className='show-tracks' href="#">Show Tracks</a>
                <button className='btn btn-signin'>SIGN-IN</button>
            </div>
            <div className='date-time-container'>
                <Clock />
                <CurrentDate />
                d</div>
            <div className='btn-container'>
                <button className='btn'>CHECK-IN</button>
                <button className='btn'>CHECK-OUT</button>
            </div>
        </div>
    )
}

export default Banner
