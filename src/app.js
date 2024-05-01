const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');
const buttonContainer = document.querySelector('.button-container');

let buffer = '0';
let runningTotal = 0;
let operator = null;

function init() {
    updateDisplay('0');

    buttonContainer.addEventListener('mousedown', (e) => {
        const buttonValue = e.target.innerText;

        if (!isNaN(parseFloat(buttonValue))) {
            handleNumberClick(e);
        } else {
            handleOperatorClick(e);
        }
    });
}

function handleOperatorClick(e) {
    console.log(e.target.innerText);
    e.target.classList.add('button-down');

    switch (e.target.innerText) {
        case 'c':
            clearAll();
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            if (buffer === '0') {
                return;
            } else if (runningTotal === 0) {
                runningTotal = parseFloat(buffer);
            } else {
                calculate();
            }

            operator = e.target.innerText;
            buffer = '0';
            updateDisplay(runningTotal);
            break;
        case '=':
            if (operator === null) {
                return;
            }

            calculate();
            updateDisplay(runningTotal);
            operator = null;
            break;
        case '⌫':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }

            break;
        case '.':
            if (!buffer.includes('.')) {
                buffer += e.target.innerText;
            }
            break;
        default:
            console.log('not a number or operator button');
            break;
    }
}

function calculate() {
    const floatBuffer = parseFloat(buffer);

    if (operator === '+') {
        runningTotal += floatBuffer;
    } else if (operator === '-') {
        runningTotal -= floatBuffer;
    } else if (operator === 'x') {
        runningTotal *= floatBuffer;
    } else if (operator === '/') {
        runningTotal /= floatBuffer;
    }

    buffer = runningTotal.toString();
    console.log(buffer);
}

function handleNumberClick(e) {
    if (buffer === '0') {
        buffer = e.target.innerText;
    } else {
        buffer += e.target.innerText;
    }

    updateDisplay(buffer);
    e.target.classList.add('button-down');
}

function clearAll() {
    buffer = '0';
    runningTotal = 0;
    operator = null;
}

function updateDisplay(stringlToDisplay) {
    display.innerHTML = stringlToDisplay;
}

buttons.forEach((button) => {
    button.addEventListener('mouseup', (e) => {
        e.target.classList.remove('button-down');
    });
});

buttons.forEach((button) => {
    button.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('button-down');
    });
});

init();
