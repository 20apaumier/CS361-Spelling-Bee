import React, { useEffect } from 'react';

function WordTimer({ timeLeft, setTimeLeft }) {
    
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, setTimeLeft]);

    return <h1>{timeLeft}s Remain</h1>
}

export default WordTimer;