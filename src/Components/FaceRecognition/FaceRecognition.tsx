import React, { useEffect, useRef } from 'react'
import './FaceRecognition.css'

const FaceRecognition = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error('Error al acceder a la cámara:', err));
    }, []);

    return (
        <div className='recognition-container'>
            <a>Face Recognition</a>
            <video ref={videoRef} autoPlay playsInline></video>
        </div>
    )
}

export default FaceRecognition
