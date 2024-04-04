import React, { useEffect, useRef, useState } from 'react';
import './SignIn.css';
import close from '../../assets/close.svg';
import camera from '../../assets/camara.svg';
import { useDispatch } from 'react-redux';
import { hideForm } from '../../redux/slices/SignInSlice';

const SignIn = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const [cameraState, cameraSetState] = useState<boolean>(false);

    useEffect(() => {
        startVideo();
    }, []);

    const takeSnapshot = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/jpeg');
                if (imgRef.current) {
                    imgRef.current.src = dataURL;
                }
            }
        }
    }

    const quitForm = () => {
        dispatch(hideForm());
    }

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            cameraSetState(true);
        } catch (err) {
            console.error('Error when opening the camera:', err);
        }
    };

    return (
        cameraState ?

            <div className='signin-container'>
                <div className="form">
                    <h1>Sign In</h1>
                    <label>Take a selfie: </label>
                    <div className="selfie-container">
                        <video ref={videoRef} autoPlay muted></video>
                        <button className='btn btn-snapshot' onClick={takeSnapshot}>
                            <img className='camera' src={camera} />
                        </button>
                        <img className='photo-signin' ref={imgRef} />
                    </div>

                    <div className="name-field-container">
                        <label htmlFor="fullName">Full Name: </label>
                        <input type="text" name="fullName" maxLength={50}/>
                    </div>
                    <img className='close-form' src={close} alt="close-form" onClick={quitForm} />
                    <button className='btn btn-send' onClick={takeSnapshot}>
                        Send
                    </button>
                </div>
            </div>
            :
            <div className="loading">Hola cargando</div>
    )
}

export default SignIn
