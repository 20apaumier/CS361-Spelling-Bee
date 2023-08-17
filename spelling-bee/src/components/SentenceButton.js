import React from 'react';

function SentenceButton({ sentence }) {
    const playAudio = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = sentence;
        window.speechSynthesis.speak(msg);
    };

    return <button onClick={playAudio} className="sentenceButton">Play Sentence</button>
}

export default SentenceButton;