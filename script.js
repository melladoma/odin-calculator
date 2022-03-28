//CALCULATOR FUNCTIONS
let b;
function add(a, b) {
    return Math.round((a + b) * 1000000000) / 1000000000; //rounded to 9 decimals
}

function subtract(a, b) {
    return Math.round((a - b) * 1000000000) / 1000000000;
}

function multiply(a, b) {
    return Math.round((a * b) * 1000000000) / 1000000000;
}

function divide(a, b) {
    return b === 0 ? "REALLY?" : Math.round((a / b) * 1000000000) / 1000000000;

}

function operate(a, operator, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        return divide(a, b);
    }
}

//CLICKED KEYS TO DISPLAY FUNCTIONS
let screenDisplay = document.getElementById('screen-display');
let screenDisplayText = "";
let screenDisplayValue;
let floatActive = false;
let dotKey = document.getElementById('keydot')

let numberKeys = document.querySelectorAll('.number-key');
numberKeys.forEach(key => {
    key.addEventListener('click', getKeyDisplay);
})


function getKeyDisplay(ev) { //type string
    if (screenDisplayText.length < 11) {
        screenDisplayText += ev.target.textContent; //string concatenation
        screenDisplayValue = parseFloat(screenDisplayText); //conversion to floating number
        screenDisplay.textContent = screenDisplayValue; //display number (zero disappears)
    }
}
//AC KEY
let clearAllKey = document.getElementById('allclear-key');
clearAllKey.addEventListener('click', clearAll);

function clearAll() {
    screenDisplayText = "";
    screenDisplayValue = 0;
    screenDisplay.textContent = screenDisplayValue;
}

//DEL KEY
let deleteKey = document.getElementById('delete-key');
deleteKey.addEventListener('click', deleteLast);

function deleteLast() {
    screenDisplayText = screenDisplay.textContent;
    if (isNaN(screenDisplayText)) {
        clearAll();
    } else {
        let lastIndex = screenDisplayText.length - 1;
        if (lastIndex === 0) {
            clearAll();
        } else {
            screenDisplayTextCut = screenDisplayText.slice(0, lastIndex);
            screenDisplayText = screenDisplayTextCut;
            screenDisplayValue = parseFloat(screenDisplayText);
            screenDisplay.textContent = screenDisplayValue;
        }
    }
}

//CALCULATOR FUNCTIONS
//operator event 
let operatorKeys = document.querySelectorAll('.operator-key');
let operatorChoice;
let inputA; // first operand for operate()
let inputB; //second operand for operate()
let result; //result from operate()

operatorKeys.forEach(key => {
    key.addEventListener('click', getAandOperator);
})

function getAandOperator(ev) {
    if ((screenDisplayValue === 0 || screenDisplayValue == null) && screenDisplayText === "") {
        /* if nothing has been inputed before operator clicking
           screen value is taken as operand */
        screenDisplayText = screenDisplay.textContent;
        screenDisplayValue = parseFloat(screenDisplayText);
        inputA = screenDisplayValue;
    } else if (inputA != null) {
        /*if something has already be inputed as first operand (ex : 4 + 3 +)
         do the calc and display result (4 + 3), then stores result (7) in inputA
         to enable other operation forward */
        finishOperation();
        inputA = result;
    } else {
        /* nominal mode, some numbers have been clicked by the user, 
         the number in its state upon clicking is stored in inputA */
        inputA = screenDisplayValue;
    }
    //clears display for next input
    screenDisplayText = "";
    screenDisplayValue = 0;
    operatorChoice = ev.target.getAttribute('data-id');
}

function finishOperation() {
    //stores second operand + calculates + displays result
    inputB = screenDisplayValue;
    if ((inputB == null) && (inputA === 0 | inputA == null)) {
        screenDisplayText = screenDisplay.textContent;
        screenDisplayValue = parseFloat(screenDisplayText);
        result = screenDisplayValue;
    } else if (inputB == null) {
        result = inputA;
    } else {
        result = operate(inputA, operatorChoice, inputB);
    }
    if (result.toString().length < 12) {
        screenDisplayValue = result;
        screenDisplayText = result.toString();
        screenDisplay.textContent = screenDisplayValue;
    } else {
        screenDisplay.textContent = "TOO LONG !"
    }
    screenDisplayText = '';
    screenDisplayValue = 0;
    inputA = null;
}

//equals event 
let equalsKey = document.getElementById('equals-key');
equalsKey.addEventListener('click', finishOperation);

//KEYBOARD SUPPORT 
window.addEventListener('keydown', getKeyPressed)

function getKeyPressed(ev) {
    if (!isNaN(parseFloat(ev.key)) || ev.key == ".") {// numerical values + dot
        if (screenDisplayText.length < 11) {
            screenDisplayText += ev.key; //string concatenation
            screenDisplayValue = parseFloat(screenDisplayText); //conversion to floating number
            screenDisplay.textContent = screenDisplayValue; //display number (zero disappears)
        }
    } else if (ev.key == "/" || ev.key == "*" || ev.key == "+" || ev.key == "-") {
        if ((screenDisplayValue === 0 || screenDisplayValue == null) && screenDisplayText === "") {
            /* if nothing has been inputed before operator clicking
               screen value is taken as operand */
            screenDisplayText = screenDisplay.textContent;
            screenDisplayValue = parseFloat(screenDisplayText);
            inputA = screenDisplayValue;
        } else if (inputA != null) {
            /*if something has already be inputed as first operand (ex : 4 + 3 +)
             do the calc and display result (4 + 3), then stores result (7) in inputA
             to enable other operation forward */
            finishOperation();
            inputA = result;
        } else {
            /* nominal mode, some numbers have been clicked by the user, 
             the number in its state upon clicking is stored in inputA */
            inputA = screenDisplayValue;
        }
        //clears display for next input
        screenDisplayText = "";
        screenDisplayValue = 0;
        operatorChoice = ev.key;
    } else if (ev.key == "Enter" || ev.key == "=") {
        finishOperation();
    } else if (ev.key == "Backspace") {
        deleteLast();
    }
}