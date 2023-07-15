import React, { useState } from 'react';

function WordInput({ onSubmit, guessesLeft }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);  // Call the onSubmit function with the current input value
        setValue('');  // Clear the input field
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} className="text-input"/>
            <br/>
            <button type="submit" disabled={guessesLeft <= 0}>Submit</button>  
        </form>
    );
}

export default WordInput;