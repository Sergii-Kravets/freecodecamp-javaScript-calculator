import React, { useState } from 'react';

const Nice = () => {
    const [input, setInput] = useState('0');
    const [prevInput, setPrevInput] = useState('');
    const [operator, setOperator] = useState('');
    const [resetInput, setResetInput] = useState(false);

    const handleNumberClick = (value) => {
        if (resetInput || input === '0') {
            setInput(value);
            setResetInput(false);
        } else {
            setInput(input + value);
        }
    };

    const handleOperatorClick = (operator) => {
        if (prevInput === '') {
            setPrevInput(input);
        } else if (operator) {
            const result = calculate();
            setInput(result);
            setPrevInput(result);
        }
        setOperator(operator);
        setResetInput(true);
    };

    const calculate = () => {
        const prev = parseFloat(prevInput);
        const current = parseFloat(input);
        switch (operator) {
            case '+':
                return (prev + current).toString();
            case '-':
                return (prev - current).toString();
            case '*':
                return (prev * current).toString();
            case '/':
                return (prev / current).toString();
            default:
                return input;
        }
    };

    const handleEqualClick = () => {
        if (operator) {
            const result = calculate();
            setInput(result);
            setPrevInput('');
            setOperator('');
        }
    };

    const handleClearClick = () => {
        setInput('0');
        setPrevInput('');
        setOperator('');
        setResetInput(false);
    };

    const handleDecimalClick = () => {
        if (!input.includes('.')) {
            setInput(input + '.');
        }
    };

    return (
        <div id="calculator">
            <div id="display">{input}</div>
            <div className="button-row">
                <button className="wide" onClick={handleClearClick}>AC</button>
            </div>
            <div className="button-row">
                <button onClick={() => handleNumberClick('7')}>7</button>
                <button onClick={() => handleNumberClick('8')}>8</button>
                <button onClick={() => handleNumberClick('9')}>9</button>
                <button className="operator" onClick={() => handleOperatorClick('/')}>/</button>
            </div>
            <div className="button-row">
                <button onClick={() => handleNumberClick('4')}>4</button>
                <button onClick={() => handleNumberClick('5')}>5</button>
                <button onClick={() => handleNumberClick('6')}>6</button>
                <button className="operator" onClick={() => handleOperatorClick('*')}>*</button>
            </div>
            <div className="button-row">
                <button onClick={() => handleNumberClick('1')}>1</button>
                <button onClick={() => handleNumberClick('2')}>2</button>
                <button onClick={() => handleNumberClick('3')}>3</button>
                <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
            </div>
            <div className="button-row">
                <button onClick={() => handleNumberClick('0')}>0</button>
                <button onClick={handleDecimalClick}>.</button>
                <button onClick={handleEqualClick}>=</button>
                <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
            </div>
        </div>
    );
};

export default Nice;
