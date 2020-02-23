const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const decimalButton = document.querySelector('[data-decimal]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousOperand = document.querySelector('#previous-operand');
const currentOperand = document.querySelector('#current-operand');
let needsReset = '';
let operation = '';

function clearAll() {
    previousOperand.innerHTML = '';
    currentOperand.innerHTML = '';
    operation = '';
}

function handleDisplay() {
    if (currentOperand.innerHTML) {
        currentOperand.innerHTML = parseFloat(
            currentOperand.innerHTML.replace(/,/g, '')
        ).toLocaleString('en');
    }
}

function handleNeedsReset() {
    currentOperand.innerHTML = '';
    operation = '';
    needsReset = 'false';
}

function handleNegNum() {
    currentOperand.innerHTML = '-';
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (needsReset == 'true') handleNeedsReset();
        if (currentOperand.innerHTML.length > 13) return;
        currentOperand.innerHTML = currentOperand.innerHTML + button.innerHTML;
        handleDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Allows user to enter a negative number after a computation
        if (needsReset === 'true') handleNeedsReset();
        // Allows user to enter a negative number
        if (button.innerHTML === '-') {
            if (currentOperand.innerHTML === '-') return;
            if (!currentOperand.innerHTML) {
                handleNegNum();
                return;
            }
        }
        // Allows a user to create a previous operand only if the current operand exists and is a number
        if (
            !isNaN(currentOperand.innerHTML) &&
            currentOperand.innerHTML &&
            !previousOperand.innerHTML
        ) {
            operation = button.innerHTML;
            previousOperand.innerHTML = `${currentOperand.innerHTML} ${operation}`;
            currentOperand.innerHTML = '';
        }
    });
});

clearAllButton.addEventListener('click', button => {
    clearAll();
});

equalsButton.addEventListener('click', button => {
    needsReset = 'true';
    compute();
});

decimalButton.addEventListener('click', button => {
    // Prevents user from entering more than one decimal
    if (!currentOperand.innerHTML.includes('.')) {
        currentOperand.innerHTML = currentOperand.innerHTML + '.';
    }
});

function compute() {
    const firstNum = parseFloat(previousOperand.innerHTML.replace(/,/g, ''));
    const secondNum = parseFloat(currentOperand.innerHTML.replace(/,/g, ''));
    switch (operation) {
        case '+':
            total = firstNum + secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = '';
            break;

        case '-':
            total = firstNum - secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = '';
            break;

        case 'x':
            total = firstNum * secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = '';
            break;

        case '÷':
            total = firstNum / secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = '';
            break;

        default:
            '';
            break;
    }
}