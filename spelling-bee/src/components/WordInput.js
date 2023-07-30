import React, { useState } from 'react';

function WordInput({ onSubmit, guessesLeft, guessState }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        onSubmit(formattedValue); 
        setValue(''); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} className={`text-input ${guessState}`} placeholder="Enter your guess here" />
            <br/>
            <button type="submit" disabled={guessesLeft <= 0} className="submit-button">Submit</button>  
        </form>
    );
}

export default WordInput;