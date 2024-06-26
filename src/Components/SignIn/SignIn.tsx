import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './SignIn.css';
import close from '../../assets/close.svg';
import camera from '../../assets/camara.svg';
import check from '../../assets/success.svg';
import fail from '../../assets/error.svg';
import { useDispatch } from 'react-redux';
import { hideForm } from '../../redux/slices/SignInSlice';
import { v4 as uuidv4 } from 'uuid';
import Verifying from '../Verifying/Verifying';

const SignIn = () => {
    const API_TOKEN = "353caa8026d941f8834cb0de010c0745";
    const videoRef = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState<string>("");
    const [sending, setSendingState] = useState<boolean>(false);
    const [snapShot, setSnapShotState] = useState<boolean>(false);
    const [sended, setSendedState] = useState<boolean | null>(null);

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
                    setSnapShotState(true);
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
        } catch (err) {
            console.error('Error when opening the camera:', err);
        }
    };

    const captureFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    }

    const generateRandomName = (extension: string): string => {
        const timestamp = Date.now();
        const uuid = uuidv4();

        return `${timestamp}_${uuid}.${extension}`;
    }

    const sendForm = async () => {
        if (!imgRef.current) {
            console.error('There is no image selected');
            return;
        }
        setSendingState(true);
        const imagePath = imgRef.current.src;

        const response = await fetch(imagePath);
        const arrayBuffer = await response.arrayBuffer();

        const blob = new Blob([arrayBuffer]);

        const file = new File([blob], generateRandomName("jpeg"), { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append("photos", file);
        formData.append("name", fullName);
        formData.append("store", "1");
        formData.append("collections", "employeesTrack");

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: new Headers({
                "token": API_TOKEN
            }),
            body: formData,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://api.luxand.cloud/v2/person", requestOptions);
            const data = await response.json();
            setSendingState(false);
            console.log('Respuesta de Luxand API:', data);
            setSendedState(true);
            setTimeout(() => {
                quitForm();
            }, 2500);
        } catch (error) {
            setSendedState(false);
            console.error('Error al enviar la imagen a la API de Luxand:', error);
        }
    };

    return (

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
                    <input type="text" name="fullName" value={fullName} onChange={captureFullName} maxLength={50} />
                </div>
                <img className='close-form' src={close} alt="close-form" onClick={quitForm} />
                {fullName && snapShot ?
                    <button className='btn btn-send' onClick={sendForm}>
                        Send
                    </button>
                    :
                    <button className='btn btn-send disabled' disabled onClick={sendForm}>
                        Send
                    </button>
                }
                {sending &&
                    <Verifying />
                }
                {sended === true &&
                    <div className="result-send">
                        <img className='icon-success-send' src={check} />
                    </div>
                }
                {sended === false &&
                    <div className="result-send">
                        <img className='icon-fail-send' src={fail} />
                    </div>
                }

            </div>
        </div>





    )
}

export default SignIn
