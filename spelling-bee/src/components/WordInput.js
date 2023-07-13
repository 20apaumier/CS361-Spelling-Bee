import React, { useState } from 'react';

function WordInput() {

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <input type="text" value={value} onChange={handleChange} className="text-input"/>
    );
  }

export default WordInput;