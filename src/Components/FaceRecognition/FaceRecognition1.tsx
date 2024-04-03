import React, { useEffect, useRef, useState } from 'react';
import "./FaceRecognition.css";
import { useDispatch } from 'react-redux';
import { hideCamera } from '../../redux/slices/checkSlice';
import close from '../../assets/close.svg';
import chica2 from './chica2.jpeg';//AQUI ESTA MI FOTO EN JPEG
import chica1 from './chica1.jpeg';//AQUI ESTA MI FOTO EN JPEG
import { v4 as uuidv4 } from 'uuid';

const FaceRecognition = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const API_TOKEN = "353caa8026d941f8834cb0de010c0745";
    const [cameraState, cameraSetState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const videoRef = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        startVideo();
    }, []);

    const generateRandomName = (extension: string): string => {
        const timestamp = Date.now(); // 
        const uuid = uuidv4(); 

        return `${timestamp}_${uuid}.${extension}`;
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const imageFile = event.target.files[0];
            setSelectedImage(imageFile);
        }
    };

    const quitCamera = () => {
        dispatch(hideCamera());
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

    const addPerson = async () => {
        if (!selectedImage) {
            console.error('No se ha seleccionado ninguna imagen.');
            return;
        }

        const formData = new FormData();
        formData.append("photos", selectedImage);
        formData.append("name", "Alexandra");
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
            console.log('Respuesta de Luxand API:', data);
        } catch (error) {
            console.error('Error al enviar la imagen a la API de Luxand:', error);
        }
    };

    const verifyFace = async () => {
        if (!imgRef.current) {
            console.error('No se ha seleccionado ninguna imagen.');
            return;
        }

        const imagePath = imgRef.current.src;

        const response = await fetch(imagePath);
        const arrayBuffer = await response.arrayBuffer();

        const blob = new Blob([arrayBuffer]);

        const file = new File([blob], generateRandomName("jpeg"), { type: 'image/jpeg' });

        var formData = new FormData();
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
            const response = await fetch("https://api.luxand.cloud/photo/verify/fa9e2537-f201-11ee-8061-0242ac160003", requestOptions);
            const data = await response.json();
            console.log('Respuesta de Luxand verify API:', data);
        } catch (error) {
            console.error('Error al enviar la imagen a la API de Luxand:', error);
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
                }
            }
            // verifyFace();
        }
    }

    return (
        cameraState ?
            <div className='recognition-container'>
                <a>Face Recognition</a>
                <video ref={videoRef} autoPlay muted></video>
                {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
                {/* <button className='btn' onClick={addPerson}>Agregar Persona</button> */}
                <button className='btn btn-verify' onClick={takeSnapshot}>Take a photo</button>
                <img className='photo' ref={imgRef} alt="photo" />
                <img className='close-camera' src={close} alt="close-camera" onClick={quitCamera} />
                {/* {selectedImage && (
                    <div>
                        <h3>Photo:</h3>
                        <img className='photo' src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
                    </div>
                )} */}
            </div>
            :
            <div className="loading">Hola cargando</div>
    );
};

export default FaceRecognition;
