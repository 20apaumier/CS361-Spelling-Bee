import React from 'react';

function PronunciationButton({ word }) {
    // play audio of given word
    const playAudio = () => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = word;
        window.speechSynthesis.speak(msg);
    };

    return <button onClick={playAudio} className="pronunciationButton">Play Pronunciation</button>
}

export default PronunciationButton;