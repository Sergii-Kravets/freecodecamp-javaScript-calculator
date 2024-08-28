import React, { useState, useEffect } from 'react';

const Calculator = () => {
    const [count, setCount] = useState(0);
    const [answer, setAnswer] = useState("");
    const [expression, setExpression] = useState("");
    const et = expression.trim();

    const isOperator = (symbol) => {
        return /[*/+-]/.test(symbol);
    };

    const reset = () => {
        setAnswer("");
        setExpression("0");
    }

    const action = (event) => {
        if (isOperator(event.target.innerText)) {
            setExpression(et + " " + event.target.innerText + " ");
        } else if (event.target.innerText === "=") {
            calculate();
        } else if (event.target.innerText === "0") {
            if (expression.charAt(0) !== "0") {
                setExpression(expression + event.target.innerText);
            }
        } else if (event.target.innerText === ".") {
            // split by operators and get last number
            const lastNumber = expression.split(/[-+/*]/g).pop();
            if (!lastNumber) return;
            console.log("lastNumber :>> ", lastNumber);
            // if last number already has a decimal, don't add another
            if (lastNumber?.includes(".")) return;
            setExpression(expression + event.target.innerText);
        } else {
            if (expression.charAt(0) === "0") {
                setExpression(expression.slice(1) + event.target.innerText);
            } else {
                setExpression(expression + event.target.innerText);
            }
        }
    };

    const calculate = () => {
        // if last char is an operator, do nothing
        if (isOperator(et.charAt(et.length - 1))) return;
        // clean the expression so that two operators in a row uses the last operator
        // 5 * - + 5 = 10
        const parts = et.split(" ");
        const newParts = [];

        // go through parts backwards
        for (let i = parts.length - 1; i >= 0; i--) {
            if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
                newParts.unshift(parts[i]);
                let j = 0;
                let k = i - 1;
                while (isOperator(parts[k])) {
                    k--;
                    j++;
                }
                i -= j;
            } else {
                newParts.unshift(parts[i]);
            }
        }
        const newExpression = newParts.join(" ");
        if (isOperator(newExpression.charAt(0))) {
            setAnswer(eval(answer + newExpression));
        } else {
            setAnswer(eval(newExpression));
        }
        setExpression("");
    };


    useEffect(()=>{
        document.addEventListener('keydown', detectKeyDown, true)
    }, [count])

    const detectKeyDown = (event) => {
        let calcNumbers = {
            "0":"zero",
            "1":"one",
            "2":"two",
            "3":"three",
            "4":"four",
            "5":"five",
            "6":"six",
            "7":"seven",
            "8":"eight",
            "9":"nine",
            ".":"decimal",
            "Clear":"clear",
            "=":"equals",
            "Enter":"equals",
            "/":"divide",
            "*":"multiply",
            "-":"subtract",
            "+":"add",
        }

        const calcId = calcNumbers[event.key]

        if (calcId !== undefined){
            const calcButton = document.getElementById(calcId)
            calcButton.click();

            calcButton.style.backgroundColor = "rgba(9,241,55,0.96)";

            setTimeout(()=>{
                ['multiply', 'divide', 'subtract', 'add'].includes(calcId)?
                    calcButton.style.backgroundColor = "#ff5733":
                    calcButton.style.backgroundColor = "#5c5cff"

                calcButton.removeAttribute("style")
            }, 100)
        }
    }

    return (
        <div id="calculator">
            <div id="display">
                <div id="answer">{answer}</div>
                <div id="expression">{expression}</div>
            </div>
            <div className="button-row">
                <button id="clear" className="wide" onClick={reset}>AC</button>
            </div>
            <div className="button-row">
                <button id="seven" onClick={action}>7</button>
                <button id="eight" onClick={action}>8</button>
                <button id="nine" onClick={action}>9</button>
                <button id="divide" className="operator" onClick={action}>/</button>
            </div>
            <div className="button-row">
                <button id="four" onClick={action}>4</button>
                <button id="five" onClick={action}>5</button>
                <button id="six" onClick={action}>6</button>
                <button id="multiply" className="operator" onClick={action}>*</button>
            </div>
            <div className="button-row">
                <button id="one" onClick={action}>1</button>
                <button id="two" onClick={action}>2</button>
                <button id="three" onClick={action}>3</button>
                <button id="subtract" className="operator" onClick={action}>-</button>
            </div>
            <div className="button-row">
                <button id="zero" onClick={action}>0</button>
                <button id="decimal" onClick={action}>.</button>
                <button id="equals" onClick={calculate}>=</button>
                <button id="add" className="operator" onClick={action}>+</button>
            </div>
        </div>
    );
};

export default Calculator;



//
// import React, { useState, useEffect } from 'react';
//
// const Calculator = () => {
//     const [count, setCount] = useState(0);
//     const [input, setInput] = useState('0')
//     let [decimalFlag, seDecimalFlag] = useState(false)
//
//     const action = (event) => {
//         if (input.length >= 2){
//             if (input[input.length-1] === '0' && ['+', '-', '/', '*'].includes(input[input.length-2])){
//                 return
//             }
//         }
//
//         if (input == '0') {
//             setInput(event.target.innerText);
//         } else {
//             setInput(input + event.target.innerText);
//         }
//     }
//
//     const handleDecimalClick = () => {
//         if (decimalFlag === false){
//             if (input[input.length - 1] !== '.') {
//                 setInput(input + '.');
//                 seDecimalFlag(true)
//             }
//         }
//     };
//
//     const reset = () => {
//         setInput('0')
//     }
//
//     const calculate = () => {
//         if (['+', '-', '/', '*'].includes(input[input.length-1])){
//             return
//         }
//
//         setInput(eval(input))
//     }
//
//     const handleOperatorClick = (event) => {
//         seDecimalFlag(false)
//
//         if (event.target.innerText === '-' && input[input.length-1] === '-'){
//             return;
//         }
//
//         if (['+', '/', '*'].includes(input[input.length-1])){
//             if (event.target.innerText === '-'){
//                 setInput(input + event.target.innerText);
//             }
//
//             if (['+', '-', '/', '*'].includes(input[input.length-1]) && ['+', '/', '-', '*'].includes(input[input.length-2])) {
//
//             }
//
//             return
//         }
//
//
//         setInput(input + event.target.innerText);
//     };
//
//     useEffect(()=>{
//         document.addEventListener('keydown', detectKeyDown, true)
//     }, [count])
//
//     const detectKeyDown = (event) => {
//         let calcNumbers = {
//             "0":"zero",
//             "1":"one",
//             "2":"two",
//             "3":"three",
//             "4":"four",
//             "5":"five",
//             "6":"six",
//             "7":"seven",
//             "8":"eight",
//             "9":"nine",
//             ".":"decimal",
//             "Clear":"clear",
//             "=":"equals",
//             "Enter":"equals",
//             "/":"divide",
//             "*":"multiply",
//             "-":"subtract",
//             "+":"add",
//         }
//
//         const calcId = calcNumbers[event.key]
//
//         if (calcId !== undefined){
//             const calcButton = document.getElementById(calcId)
//             calcButton.click();
//
//             calcButton.style.backgroundColor = "rgba(9,241,55,0.96)";
//
//             setTimeout(()=>{
//                 ['multiply', 'divide', 'subtract', 'add'].includes(calcId)?
//                     calcButton.style.backgroundColor = "#ff5733":
//                     calcButton.style.backgroundColor = "#5c5cff"
//
//                 calcButton.removeAttribute("style")
//             }, 100)
//         }
//     }
//
//     return (
//         <div id="calculator">
//             <div id="display">{input}</div>
//             <div className="button-row">
//                 <button id="clear" className="wide" onClick={reset}>AC</button>
//             </div>
//             <div className="button-row">
//                 <button id="seven" onClick={action}>7</button>
//                 <button id="eight" onClick={action}>8</button>
//                 <button id="nine" onClick={action}>9</button>
//                 <button id="divide" className="operator" onClick={handleOperatorClick}>/</button>
//             </div>
//             <div className="button-row">
//                 <button id="four" onClick={action}>4</button>
//                 <button id="five" onClick={action}>5</button>
//                 <button id="six" onClick={action}>6</button>
//                 <button id="multiply" className="operator" onClick={handleOperatorClick}>*</button>
//             </div>
//             <div className="button-row">
//                 <button id="one" onClick={action}>1</button>
//                 <button id="two" onClick={action}>2</button>
//                 <button id="three" onClick={action}>3</button>
//                 <button id="subtract" className="operator" onClick={handleOperatorClick}>-</button>
//             </div>
//             <div className="button-row">
//                 <button id="zero" onClick={action}>0</button>
//                 <button id="decimal" onClick={handleDecimalClick}>.</button>
//                 <button id="equals" onClick={calculate}>=</button>
//                 <button id="add" className="operator" onClick={handleOperatorClick}>+</button>
//             </div>
//         </div>
//     );
// };
//
// export default Calculator;
