import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Options = ({
    solution,
    shouldDisplaySolution,
    toggleDisplaySolution,
    getNewWord,
}) => {

    return (
        <div className='options'>
            <div className='title'>
                word circle
            </div>
            <div className='new-game'>
                <span
                    className='dotted-underline'
                    onClick={getNewWord}
                >
                    new word
                </span>
            </div>
            <div
                className='solution'
                onClick={toggleDisplaySolution}
            >
                <span className='dotted-underline'>
                    show solution
                </span>
            </div>
            <a
                className='github'
                href='https://github.com/cbass10liu/word-circle'
                target="_blank"
            >
                github
            </a>
            <div className='info'>
                {shouldDisplaySolution ? solution : ''}
            </div>
        </div>
    );

};

Options.propTypes = {
    solution: PropTypes.string.isRequired,
    shouldDisplaySolution: PropTypes.bool.isRequired,
    toggleDisplaySolution: PropTypes.func.isRequired,
    getNewWord: PropTypes.func.isRequired,
};

export default Options;
