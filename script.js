const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const decimalButton = document.querySelector('[data-decimal]');
const clearAllButton = document.querySelector('[data-clear-all]');
const previousOperand = document.querySelector('#previous-operand');
const currentOperand = document.querySelector('#current-operand');
let storePreviousOperand;
let needsReset;
let operation = "";

function handleDisplay() {
    if(currentOperand.innerHTML) {
        currentOperand.innerHTML = parseFloat(currentOperand.innerHTML.replace(/[^0-9]/g, ""));
        currentOperand.innerHTML = Number(currentOperand.innerHTML).toLocaleString('en');
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(currentOperand.innerHTML.length > 13) return;
        currentOperand.innerHTML = currentOperand.innerHTML + button.innerHTML;
        handleDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        operation = button.innerHTML
        previousOperand.innerHTML = currentOperand.innerHTML;
        currentOperand.innerHTML = "";
    });
})

clearAllButton.addEventListener('click', button => {
    clearAll()
})

equalsButton.addEventListener('click', button => {
    compute()
})

decimalButton.addEventListener('click', button => {
    if(!currentOperand.innerHTML.includes(".")) {
        currentOperand.innerHTML = currentOperand.innerHTML + "."
    }
})

function clearAll() {
    previousOperand.innerHTML = "";
    currentOperand.innerHTML = "";
    operation = "";
}

function compute() {
    const firstNum = parseFloat(previousOperand.innerHTML.replace(/[^0-9]/g, ""));
    const secondNum = parseFloat(currentOperand.innerHTML.replace(/[^0-9]/g, ""));
    switch (operation) {
        case '+':
            total = firstNum + secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = "";   
        break;
        
        case '-':
            total = firstNum - secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = ""; 
        break;

        case 'x':
            total = firstNum * secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = ""; 
        break;
        
        case '÷':
            total = firstNum / secondNum;
            currentOperand.innerHTML = total.toLocaleString('en');
            previousOperand.innerHTML = ""; 
        break;
    
        default:""
            break;
    }

}