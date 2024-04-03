import React, { useState } from 'react'
import "./Check.css"
import { useDispatch, useSelector } from 'react-redux';
import { showCamera } from '../../redux/slices/checkSlice';
import { RootState } from "../../redux/store";
import FaceRecognition from '../FaceRecognition/FaceRecognition1';

const Check = () => {

    const cameraVisibility = useSelector((state: RootState) => state.check.visible);

    const dispatch = useDispatch();

    const displayCamera = () => {
        dispatch(showCamera());
    }


    return (
        <div>
            <div className='btn-container'>
                <button className='btn' onClick={displayCamera}>CHECK-IN</button>
                <button className='btn' onClick={displayCamera}>CHECK-OUT</button>
            </div>
            {
                cameraVisibility &&
                <FaceRecognition />
            }
        </div>
    )
}

export default Check
