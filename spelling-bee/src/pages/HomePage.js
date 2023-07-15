import React from 'react';
import BeginGame from '../components/BeginGame';

function HomePage({ wordData }) {

    return (
        <div>
            <h2>
                Welcome to the Spelling Bee!
            </h2>
            <p>
                Bress the button below to begin your game!
            </p>
            <BeginGame wordData={wordData} />
        </div>
    );
}

export default HomePage;