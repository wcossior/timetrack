import React from 'react'
import './Message.css'
import success from '../../assets/success.svg';
import error from '../../assets/error.svg';

const Message = ({ type }: { type: string }) => {
    return (
        <div className="msg-container center">
            <div className='bg-msg'>
            </div>
            <div className='card-container center'>
                <img className='success' src={type === "success" ? success : error} alt="success-icon" />
                {
                    type === "success" ?
                        <p>Face recognition<strong> sucessfull!</strong></p>
                        :
                        <p>Sorry, Face recognition<strong> failed!</strong></p>
                }
                <button className={type === "success" ? "btn" : "btn btn-error"}>OK</button>
            </div>
        </div>
    )
}

export default Message
