import React from 'react'
import './Message.css'
import success from '../../assets/success.svg';

const Message = () => {
    return (
        <div className="msg-container center">
            <div className='bg-msg'>
            </div>
            <div className='card-container center'>
                <img className='success' src={success} alt="success-icon" />
                <p><strong>Face recognition</strong> sucessfull!</p>
                <button className='btn'>OK</button>
            </div>
        </div>
    )
}

export default Message
