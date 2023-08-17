import React, { useEffect } from 'react';

function WordTimer({ timeLeft, setTimeLeft }) {
    
    // subtracts timeLeft by 1 and returns the timeLeft in html
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, setTimeLeft]);

    return <h1>{timeLeft}s Remain</h1>
}

export default WordTimer;