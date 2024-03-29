import React, { useState } from 'react'
import "./Check.css"
import FaceRecognition from '../FaceRecognition/FaceRecognition';

const Check = () => {

    const [stateCamera, setStateCamera] = useState(false);

    const showCamera = () => {
        setStateCamera(true);
    }

    const hideCamera = () => {
        setStateCamera(false);
    }

    return (
        <div className='center'>
            <div className='btn-container'>
                <button className='btn' onClick={showCamera}>CHECK-IN</button>
                <button className='btn' onClick={showCamera}>CHECK-OUT</button>
            </div>
            {
                stateCamera &&
                <FaceRecognition />
            }
        </div>
    )
}

export default Check
