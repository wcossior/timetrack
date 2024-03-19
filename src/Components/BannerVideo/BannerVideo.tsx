import React from 'react'
import video from '../../assets/video.mp4'
import './BannerVideo.css'

const BannerVideo = () => {
    return (
        <div className='video-container'>
            <video src={video} autoPlay loop muted></video>
        </div>
    )
}

export default BannerVideo
