import React from 'react';

function PronunciationButton({ word }) {
    const playAudio = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = word;
        window.speechSynthesis.speak(msg);
    };

    return <button onClick={playAudio}>Play Pronunciation</button>
}

export default PronunciationButton;