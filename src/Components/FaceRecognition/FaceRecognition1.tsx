import { useEffect, useRef, useState } from 'react';
import "./FaceRecognition.css";
import { useDispatch } from 'react-redux';
import { hideCamera, noIsTheCorrectSubject, setSubject, yesIsTheCorrectSubject } from '../../redux/slices/checkSlice';
import close from '../../assets/close.svg';
import imgDefault from '../../assets/imgDefault.svg';
import loading from '../../assets/loading.svg';
import { v4 as uuidv4 } from 'uuid';
import Verifying from '../Verifying/Verifying';

const FaceRecognition = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [snapshot, setSnapshotState] = useState<boolean>(false);
    const [verifying, setVerifyingState] = useState<boolean>(false);
    const API_TOKEN = "353caa8026d941f8834cb0de010c0745";
    const dispatch = useDispatch();
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        startVideo();
    }, []);

    const generateRandomName = (extension: string): string => {
        const timestamp = Date.now(); // 
        const uuid = uuidv4();

        return `${timestamp}_${uuid}.${extension}`;
    }

    const quitCamera = () => {
        dispatch(hideCamera());
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
    }


    const searchFace = async () => {
        if (!imgRef.current) {
            console.error('No se ha capturado ninguna imagen.');
            return;
        }
        setVerifyingState(true);

        const imagePath = imgRef.current.src;

        const response = await fetch(imagePath);
        const arrayBuffer = await response.arrayBuffer();

        const blob = new Blob([arrayBuffer]);

        const file = new File([blob], generateRandomName("jpeg"), { type: 'image/jpeg' });

        var formData = new FormData();
        formData.append("photo", file);
        formData.append("collections", "employeesTrack");

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: new Headers({
                "token": API_TOKEN
            }),
            body: formData,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://api.luxand.cloud/photo/search/v2", requestOptions);
            const data = await response.json();
            if (data.length > 0) {
                const id = data[0].uuid;
                const nameSubject = data[0].name;
                verifyFace(file, id, nameSubject);
            }
            console.log('Respuesta de Luxand search face API:', data);
        } catch (error) {
            console.error('Error al enviar datos a la API de Luxand:', error);
        }
    };


    const verifyFace = async (file: File, id: string, nameSubject: string) => {

        const formData = new FormData();
        formData.append("photo", file);

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: new Headers({
                "token": API_TOKEN
            }),
            body: formData,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://api.luxand.cloud/photo/verify/" + id, requestOptions);
            const data = await response.json();
            if (data) {
                if (data.message === "verified") {
                    dispatch(yesIsTheCorrectSubject());
                    dispatch(setSubject(nameSubject));
                }
            } else {
                dispatch(noIsTheCorrectSubject());
            }
            console.log('Respuesta de Luxand verify face API:', data);
            setVerifyingState(false);
            quitCamera();
        } catch (error) {
            console.error('Error al enviar datos a la API de Luxand:', error);
        }
    };

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
                    setSnapshotState(true);
                }
            }
        }
    }

    return (

        <div className='recognition-container'>
            <a>FACE RECOGNITION</a>
            <img className='loading' src={loading} onClick={quitCamera} />
            <video ref={videoRef} autoPlay muted></video>
            {!snapshot ?
                <button className='btn btn-verify' onClick={takeSnapshot}>Take a photo</button>
                :
                <button className='btn btn-verify' onClick={searchFace}>SEND TO VERIFY</button>
            }
            <div className='photo-default'>
                <img className='photo' ref={imgRef} alt="photo" />
                <img className='img-default' src={imgDefault} />
                {snapshot &&
                    <button className='btn btn-retake-photo' onClick={takeSnapshot}>Re-take a photo</button>
                }
            </div>
            <img className='close-camera' src={close} alt="close-camera" onClick={quitCamera} />
            {verifying &&
                <Verifying />
            }
        </div>
    );
};

export default FaceRecognition;
