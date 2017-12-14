import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleType from 'circletype';
import axios from 'axios';
import Options from './Options';
import Word from './Word';
import AnswerInput from './AnswerInput';
import WordnikUtil from '../utils/WordnikUtil';
import apiKey from '../../apiKey';

export default class Game extends Component {

    constructor() {
        super();
        this.state = {
            word: '',
            shiftedWord: '',
            shouldDisplaySolution: false,
        };
        this.toggleDisplaySolution = this._toggleDisplaySolution.bind(this);
        this.getNewWord = this._getNewWord.bind(this);
    }

    componentWillMount() {
        this._getNewWord();
    }

    componentDidUpdate() {
        this._circleTransform();
    }

    _circleTransform() {
        new CircleType(document.getElementById('circle-type'));
    }

    _chooseRandomWord() {
        const random = Math.floor(Math.random() * this.props.words.length);
        return this.props.words[random];
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
        axios.get(`${WordnikUtil.BASE_URL}\?excludePartOfSpeech\=${WordnikUtil.exclude}\&minCorpusCount\=100000\&minLength\=6\&maxLength\=10\&api_key\=${apiKey.wordnikApiKey}`)
        .then((response) => {
            this.setState({
                word: response.data.word,
            }, () => {
                this._shiftWord();
            });
        })
        .catch((error) => {
            console.log(error);
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
