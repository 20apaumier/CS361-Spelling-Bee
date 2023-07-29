import React from 'react';
import BeginGame from '../components/BeginGame';

function HomePage() {

    return (
        <div>
            <h2>
                Welcome to the Spelling Bee!
            </h2>
            <p>
                Bress the button below to begin your game!
            </p>
            <BeginGame/>
        </div>
    );
}

export default HomePage;