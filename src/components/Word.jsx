import React from 'react';
import PropTypes from 'prop-types';

const Word = ({
    word,
    shiftedWord,
}) => {

    return (
        <div
            id='circle-type'
            className='circular-word'
        >
            {shiftedWord}
        </div>
    );

};

Word.propTypes = {
    word: PropTypes.string.isRequired,
    shiftedWord: PropTypes.string.isRequired,
};

export default Word;
