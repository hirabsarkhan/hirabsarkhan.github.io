// script.js
let screen = document.getElementById('screen');
let currentValue = '';
let scientificMode = false;
let unitConversionEnabled = false;
let currencyConversionEnabled = false;

function clearScreen() {
    currentValue = '';
    screen.innerText = '0';
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    updateScreen();
}

function performOperation(value) {
    currentValue += value;
    updateScreen();
}

function calculateResult() {
    try {
        const result = eval(currentValue.replace('×', '*').replace('÷', '/'));
        currentValue = result.toString();
        updateScreen();
    } catch (e) {
        screen.innerText = 'Error';
        currentValue = '';
    }
}

function updateScreen() {
    screen.innerText = currentValue || '0';
}

function toggleSubMenu() {
    const subMenu = document.getElementById('subMenu');
    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
}

function toggleScientificMode() {
    scientificMode = !scientificMode;
    if (scientificMode) {
        // Enable scientific mode and add additional mathematical functions here
        alert('Scientific mode enabled');
    } else {
        alert('Scientific mode disabled');
    }
}

function toggleUnitConversion() {
    unitConversionEnabled = !unitConversionEnabled;
    if (unitConversionEnabled) {
        // Enable unit conversion mode and add unit conversion functionality here
        alert('Unit conversion enabled');
    } else {
        alert('Unit conversion disabled');
    }
}

function toggleCurrencyConversion() {
    currencyConversionEnabled = !currencyConversionEnabled;
    if (currencyConversionEnabled) {
        // Enable currency conversion mode and add currency conversion functionality here
        alert('Currency conversion enabled');
    } else {
        alert('Currency conversion disabled');
    }
}
