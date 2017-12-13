import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleType from 'circletype';
import Options from './Options';
import Word from './Word';
import AnswerInput from './AnswerInput';

export default class Game extends Component {

    constructor() {
        super();
        this.state = {
            word: 'philosophy',
            shouldDisplaySolution: false,
        };
        this.toggleDisplaySolution = this._toggleDisplaySolution.bind(this);
        this.getNewWord = this._getNewWord.bind(this);
    }

    componentWillMount() {
        this._shiftWord();
    }

    componentDidUpdate() {
        new CircleType(document.getElementById('circle-type'));
    }

    _shiftWord() {
        const shiftBy = Math.floor(Math.random() * this.state.word.length);
        const shiftedWord = this.state.word.substr(shiftBy) + this.state.word.substr(0, shiftBy);
        this.setState({
            shiftedWord: shiftedWord,
        });
    }

    _toggleDisplaySolution() {
        this.setState({
            shouldDisplaySolution: !this.state.shouldDisplaySolution,
        }, () => {
            if (this.state.shouldDisplaySolution) {
                setTimeout(() => {
                    this.setState({
                        shouldDisplaySolution: false,
                    });
                }, 1500);
            }
        });
    }

    _getNewWord() {
        this.setState({
            word: this.state.word === 'philosophy' ? 'mathematics' : 'philosophy',
        }, () => {
            this._shiftWord();
        });
    }

    render() {
        return (
            <div className='content'>
                <Options
                    solution={this.state.word}
                    shouldDisplaySolution={this.state.shouldDisplaySolution}
                    toggleDisplaySolution={this.toggleDisplaySolution}
                    getNewWord={this.getNewWord}
                />
                <div className='game'>
                    <Word
                        word={this.state.word}
                        shiftedWord={this.state.shiftedWord}
                    />
                    <AnswerInput
                        solution={this.state.word}
                        getNewWord={this.getNewWord}
                    />
                </div>
            </div>
        );
    }

}
