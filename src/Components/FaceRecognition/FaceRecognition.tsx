import React, { useEffect, useRef, useState } from 'react'
import './FaceRecognition.css'
import close from '../../assets/close.svg';
import { RootState } from "../../redux/store";
import { useDispatch } from 'react-redux';
import { hideCamera } from '../../redux/slices/checkSlice';

const FaceRecognition = () => {
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraState, cameraSetState] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                cameraSetState(true);
            })
            .catch(err => console.error('Error when opening the camera:', err));
    }, []);

    const quitCamera = () => {
        dispatch(hideCamera());
    }

    return (
        cameraState ?
            <div className='recognition-container'>
                <a>Face Recognition</a>
                <video ref={videoRef} autoPlay playsInline></video>
                <img className='close-camera' src={close} alt="close-camera" onClick={quitCamera} />
            </div>
            :
            <div className="loading">Hola cargando</div>
    )
}

export default FaceRecognition
