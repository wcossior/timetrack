import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import './Clock.css'

const Clock = () => {

    const [currentTime, setCurrentTime] = useState<string>(moment().format('LTS'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format('LTS'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <p className='clock'>{currentTime}</p>
    )
}

export default Clock
