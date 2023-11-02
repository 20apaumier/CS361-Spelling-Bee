import React, { useState } from 'react';

// This function provides the input form so the user can guess the word
function WordInput({ onSubmit, guessesLeft, guessState }) {
    // State to hold the current input value.
    const [value, setValue] = useState('');

    // Event handler for input changes.
    const handleChange = (event) => {
        setValue(event.target.value);
    };


    // Event handler for form submission.
    const handleSubmit = (event) => {
        event.preventDefault();

        // Format the input value: capitalize the first letter and make the rest lowercase.
        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        // Invoke the provided onSubmit function with the formatted value.
        onSubmit(formattedValue);
        
        // Clear the input after submitting.
        setValue(''); 
    }

    // Return the input form
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={value} 
                onChange={handleChange} 
                className={`text-input ${guessState}`} 
                placeholder="Enter your guess here" 
            />
            <br/>
            {/* Button is disabled if there are no remaining guesses */}
            <button type="submit" disabled={guessesLeft <= 0} className="submit-button">Submit</button>  
        </form>
    );
}

export default WordInput;