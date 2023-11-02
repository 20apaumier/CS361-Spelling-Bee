import React from 'react';

function AudioButton({ text, label }) {
    // play audio of the given text
    const playAudio = () => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    };

    // the label that is passed in will be shown in text on the button
    return <button onClick={playAudio} className = "hint-button">Play {label}</button>
}

export default AudioButton;