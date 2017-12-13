import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AnswerInput extends Component {

    static get propTypes() {
        return {
            solution: PropTypes.string.isRequired,
            getNewWord: PropTypes.func.isRequired,
        }
    }

    constructor() {
        super();
        this.state = {
            input: '',
            message: '',
            placeholder: 'enter answer here',
            allowSubmit: true,
        };
        this.onFocus = this._onFocus.bind(this);
        this.onBlur = this._onBlur.bind(this);
        this.onChange = this._onChange.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.solution !== this.props.solution) {
            this.setState({
                input: '',
            });
        }
    }

    _onFocus() {
        this.setState({
            placeholder: '',
        });
    }

    _onBlur() {
        this.setState({
            placeholder: 'enter answer here',
        });
    }

    _onChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    _handleKeyDown(e) {
        if (this.state.allowSubmit) {
            if (e.key.toLowerCase() === 'enter') {
                this._handleSubmit();
            } else {
                this.setState({
                    message: '',
                });
            }
        }
    }

    _displayMessage(message) {
        this.setState({
            message: message,
        }, () => {
            setTimeout(() => {
                this.setState({
                    message: '',
                });
            }, 1000);
        });
    }

    _handleSubmit() {
        if (this.state.allowSubmit) {
            if (this._isCorrect(this.state.input)) {
                this._displayMessage('correct!');
                this.setState({
                    allowSubmit: false,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            input: '',
                            allowSubmit: true,
                        });
                        this.props.getNewWord();
                    }, 1000);
                });
            } else {
                this._displayMessage('try again!');
            }
        }
    }

    _isCorrect() {
        const input = this.state.input.trim().toLowerCase();
        return input === this.props.solution;
    }

    render() {
        return (
            <div className='answer'>
                <input
                    className='answer-input'
                    type='text'
                    placeholder={this.state.placeholder}
                    value={this.state.input}
                    maxLength={20}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyDown={this.handleKeyDown}
                />
                <span className='divider'>&#124;</span>
                <button
                    className='answer-submit'
                    type='button'
                    onClick={this.handleSubmit}
                >
                    submit
                </button>
                <div className='message'>
                    {this.state.message}
                </div>
            </div>
        );
    }

}
