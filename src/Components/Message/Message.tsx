import React from 'react'
import './Message.css'
import success from '../../assets/success.svg';
import error from '../../assets/error.svg';
import { useDispatch } from 'react-redux';
import { cleanIsTheCorrectSubject } from '../../redux/slices/checkSlice';
import { showForm } from '../../redux/slices/SignInSlice';

const Message = ({ type, name }: { type: string, name?: string }) => {

    const verifiedText1: string = "Welcome " + name;
    const verifiedText2: string = "It's a pleasure to have you here.";
    const dispatch = useDispatch();
    const errorWhenVerifyingText1: string = "You are not in the database";
    const errorWhenVerifyingText2: string = "Would you like to be added?";


    const cleanPerson = () => {
        dispatch(cleanIsTheCorrectSubject());
    }
    
    const showSignInForm = () =>{
        dispatch(cleanIsTheCorrectSubject());
        dispatch(showForm());
    }

    return (
        <div className="msg-container center">
            <div className='bg-msg'>
            </div>
            <div className='card-container center'>
                <img className='success' src={type === "success" ? success : error} alt="success-icon" />
                {
                    type === "success" ?
                        <div>
                            <h2>{verifiedText1}</h2>
                            <p>{verifiedText2}</p>
                        </div>
                        :
                        <div>
                            <h2>{errorWhenVerifyingText1}</h2>
                            <p>{errorWhenVerifyingText2}</p>
                        </div>
                }
                {type == "success" ?

                    <button className="btn" onClick={cleanPerson}>OK</button>
                    :
                    <button className="btn btn-error" onClick={showSignInForm}>OK</button>
                }
            </div>
        </div >
    )
}

export default Message
