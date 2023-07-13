import React from 'react';
import WordInput from '../components/WordInput';

function GamePage() {
    return (
        <div>
            <h1>
                Word #
            </h1>
            <WordInput/>
            <h2>Submit Button</h2>
            <h1>Defintion: </h1>
            <h1>Pronunciation Button</h1>
        </div>
    );
}

export default GamePage;