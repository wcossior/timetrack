import React, { useState } from 'react'
import "./Check.css"
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import { useDispatch, useSelector } from 'react-redux';
import { showCamera } from '../../redux/slices/checkSlice';
import { RootState } from "../../redux/store";

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
