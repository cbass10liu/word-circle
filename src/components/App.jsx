import '../styles/site.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

fetch('./words.json').then((response) => {
    return response.json();
}).then((data) => {
    const words = data.words;
    ReactDOM.render(
        <Game words={words} />,
        document.getElementById('container')
    );
}).catch((err) => {
    console.error('Could not get words data.');
});
