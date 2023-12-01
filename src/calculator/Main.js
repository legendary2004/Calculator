
import React from "react";
import Button from "./button";
import buttonContent from "./buttonContent";

export default function() {
    let [number, setNumber] = React.useState("");
    let [array, setArray] = React.useState([]);
    let [arrayP, setArrayP] = React.useState([]);

    function changeNumber(e) {
        if (e.target.innerText == '0' && number.length === 0) return;
        if ( number.includes('.') && e.target.innerText === '.') return;
        else {
            number += e.target.innerText
            setNumber(number)
        }
    }

    function clear() {
        setNumber("")
        setArray([])
        setArrayP([])
    }

    function changeOperator(e) {
        if ((array[array.length - 1] == ')' || number.length > 0) && number.slice(-1) != '.') {
            if (number.length > 0) {
                array.push(number)
            }
            array.push(e.target.innerText) 
            setArray(array.slice(0, array.length))
            setNumber("")
        }   
        console.log(array)
    }

    function parenthesis(e) {
        let operator = array[array.length - 1] == '+' || array[array.length - 1] == '-' || array[array.length - 1] == '*' || array[array.length - 1] == '/'
        if (e.target.innerText == '(') {
            if (!number && (operator || array.length == 0) && (arrayP[arrayP.length - 1] == ')' || arrayP.length == 0)) {
                array.push(e.target.innerText);
                arrayP.push(e.target.innerText);
                setArrayP(arrayP)
                setArray(array.slice(0, array.length))
                console.log(array)
                console.log(arrayP)
            }
        } 
        if (e.target.innerText == ')') {
            if (number && array.length > 0 && arrayP.length > 0 && arrayP[arrayP.length - 1] == '(' && number.slice(-1) != '.') {
                array.push(number)
                array.push(e.target.innerText);
                arrayP.push(e.target.innerText);
                setArrayP(arrayP)
                setArray(array.slice(0, array.length))
                setNumber("")
            }
        }
    } 

    function backspace() {
            if (number.length > 0) {
                setNumber(number.slice(0, -1))
            }
            else if (array.length > 0) {
                if (array[array.length - 1] == '(' || array[array.length - 1] == ')') {
                    arrayP.pop()
                }
                array[array.length - 1] = array[array.length - 1].slice(0, -1)
                if (!array[array.length - 1]) {
                    array.pop()
                }
                if (array.length > 0) {
                    setNumber(array[array.length - 1])
                }
                
                setArray(array.slice(0, array.length - 1))
            }
    }


    function setEqual() {
        if ((array[array.length - 1] == ')' || number.length > 0) && number.slice(-1) != '.') {
            if (array.find(element => element == '+' || element == '-' || element == '/' || element == '*')) {
                if (arrayP[arrayP.length - 1] == '(') {
                    array.push(')')
                }
                if (number.length > 0) {
                    array.push(number)
                }
                let longestDecNum = array[0].slice(array[0].indexOf("."), array[0].length - 1).length;
                for (let i = 1; i < array.length; i++) {
                    let length = array[i].slice(array[i].indexOf('.'), array[i].length - 1).length;
                    if (length > longestDecNum) {
                        longestDecNum = length;
                    }
                }
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == '(') {
                        let newArray = array.slice(i, array.indexOf(')'))
                        let length = newArray.length
                        for (let j = 0; j < newArray.length; j++) {
                            if (newArray[j] == '*') {
                                newArray.splice(j - 1, 3, parseFloat(newArray[j - 1]) * parseFloat(newArray[j + 1]))
                                j = 0
                            }
                            if (newArray[j] == '/') {
                                newArray.splice(j - 1, 3, parseFloat(newArray[j - 1]) / parseFloat(newArray[j + 1]))
                                j = 0
                            }
                        }
                        for (let j = 0; j < newArray.length; j++) {
                            if (newArray[j] == '+') {
                                newArray.splice(j - 1, 3, parseFloat(newArray[j - 1]) + parseFloat(newArray[j + 1]))
                                j = 0
                            }
                            if (newArray[j] == '-') {
                                newArray.splice(j - 1, 3, parseFloat(newArray[j - 1]) - parseFloat(newArray[j + 1]))
                                j = 0
                            }
                        }
                        array.splice(i, length, newArray[1])
                        console.log(array)
                    }

                }
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === '/') {
                        array.splice(i - 1, 3, parseFloat(array[i - 1]) / parseFloat(array[i + 1]));
                        i = 0
                    }
                    if (array[i] === '*') {
                        array.splice(i - 1, 3, parseFloat(array[i - 1]) * parseFloat(array[i + 1]));
                        i = 0
                    }
                    
                }
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === '+') {
                        array.splice(i - 1, 3, parseFloat(array[i - 1]) + parseFloat(array[i + 1]));
                        i = 0;
                    }
                    if (array[i] === '-') {
                        array.splice(i - 1, 3, parseFloat(array[i - 1]) - parseFloat(array[i + 1]));
                        i = 0;
                    }
                }
                
                if (array[0].toString().includes(".") && longestDecNum > 0) {
                    let roundedNumber = Math.round(array[0] * 10 * longestDecNum) / (10 * longestDecNum);
                    setNumber(roundedNumber.toString())
                }
                else {
                    setNumber(array[0].toString())
                }
                
                setArray([])
                setArrayP([])
            }
        }   
        
    }
    
    const buttons = buttonContent.map(function(item, key) {
        if (item.content == '+' || item.content == '-' || item.content == '*' || item.content == '/') {
            return <Button key={key} content={item.content} color={item.color} function={changeOperator}/>
        }
        else if (item.content == '=') {
            return <Button key={key} content={item.content} color={item.color} function={setEqual}/>
        }
        else {
            return <Button key={key} content={item.content} color={item.color} function={changeNumber}/>
        }
    })
    return (
        <div className="container text-center" id="div-1">
            <div className="row">
                <input className="form-control input-1" type="text" value={number ? number : array.join("") } aria-label="readonly input example" readOnly/>
            </div>
            <div className="row">
                <div className="col-3">
                    <button className="btn btn-danger" onClick={clear}>C</button>
                </div>
                <div className="col-3">
                    <button className="btn btn-secondary" onClick={parenthesis}>(</button>
                </div>
                <div className="col-3">
                    <button className="btn btn-secondary" onClick={parenthesis}>)</button>
                </div>
                <div className="col-3">
                    <button className="btn btn-secondary" onClick={backspace}>⌫</button>
                </div>
                {buttons}
            </div>
        </div>
    )
}