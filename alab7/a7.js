// Calculator variables
let currentInput = "";
let currentOperator = null;
let operand1 = null;
let operand2 = null;
let isScientificMode = false;
let isUnitConversionMode = false;
let isCurrencyConversionMode = false;

// Basic calculator functions
function inputDigit(digit) {
    if (isUnitConversionMode || isCurrencyConversionMode) {
        return; // Don't handle digit input when in conversion modes
    }
    currentInput += digit;
    updateDisplay();
}

function inputOperator(operator) {
    if (isUnitConversionMode || isCurrencyConversionMode) {
        return; // Don't handle operator input when in conversion modes
    }
    if (currentInput !== "") {
        operand1 = parseFloat(currentInput);
        currentOperator = operator;
        currentInput = "";
    }
}

function calculateResult() {
    if (currentOperator !== null && currentInput !== "") {
        operand2 = parseFloat(currentInput);
        let result;

        switch (currentOperator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1 / operand2;
                break;
        }

        currentInput = result.toString();
        updateDisplay();
        currentOperator = null;
        operand1 = null;
        operand2 = null;
    }
}

// Function to clear the display
function clearDisplay() {
    currentInput = "";
    operand1 = null;
    operand2 = null;
    currentOperator = null;
    updateDisplay();
}

// Function to update the calculator display
function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = currentInput !== "" ? currentInput : "0";
}

// Scientific mode functions
function inputScientificFunction(func) {
    if (currentInput === "") {
        return; // Ensure there's input to work with
    }

    let inputNumber = parseFloat(currentInput);
    let result;

    switch (func) {
        case 'sqrt':
            result = Math.sqrt(inputNumber);
            break;
        case 'exp':
            // Get the exponent input from the user (e.g., `5^3` for 5 raised to the power of 3)
            let exponent = parseFloat(prompt("Enter exponent:"));
            result = Math.pow(inputNumber, exponent);
            break;
        case 'sin':
            result = Math.sin(inputNumber);
            break;
        case 'cos':
            result = Math.cos(inputNumber);
            break;
        case 'tan':
            result = Math.tan(inputNumber);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    updateDisplay();
}

// Navigation menu functionality
const menuDots = document.getElementById("menu-dots");
const submenu = document.getElementById("submenu");

menuDots.addEventListener("click", function () {
    submenu.style.display = submenu.style.display === "none" ? "block" : "none";
});

// Add event listeners for submenu options
document.getElementById("scientific-mode").addEventListener("click", function () {
    isScientificMode = !isScientificMode;
    isUnitConversionMode = false;
    isCurrencyConversionMode = false;
    document.getElementById("scientific-mode-buttons").style.display = isScientificMode ? "block" : "none";
    document.getElementById("unit-conversion-section").style.display = "none";
    document.getElementById("currency-conversion-section").style.display = "none";
    submenu.style.display = "none";
});

document.getElementById("unit-conversion").addEventListener("click", function () {
    isUnitConversionMode = !isUnitConversionMode;
    isScientificMode = false;
    isCurrencyConversionMode = false;
    document.getElementById("unit-conversion-section").style.display = isUnitConversionMode ? "block" : "none";
    document.getElementById("scientific-mode-buttons").style.display = "none";
    document.getElementById("currency-conversion-section").style.display = "none";
    submenu.style.display = "none";
    populateUnitConversionOptions(); // Populate the conversion options
});

document.getElementById("currency-conversion").addEventListener("click", function () {
    isCurrencyConversionMode = !isCurrencyConversionMode;
    isScientificMode = false;
    isUnitConversionMode = false;
    document.getElementById("currency-conversion-section").style.display = isCurrencyConversionMode ? "block" : "none";
    document.getElementById("unit-conversion-section").style.display = "none";
    document.getElementById("scientific-mode-buttons").style.display = "none";
    submenu.style.display = "none";
    populateCurrencyOptions(); // Populate the currency options
});

// Hide submenu when clicking outside of it
document.addEventListener("click", function (event) {
    if (!menuDots.contains(event.target) && !submenu.contains(event.target)) {
        submenu.style.display = "none";
    }
});

// Unit Conversion
function populateUnitConversionOptions() {
    const unitFromSelect = document.getElementById("unit-from");
    const unitToSelect = document.getElementById("unit-to");
    unitFromSelect.innerHTML = "";
    unitToSelect.innerHTML = "";

    // Determine which unit type is selected
    const unitType = document.getElementById("unit-type").value;
    let options;

    switch (unitType) {
        case "length":
            options = ["meters", "kilometers", "centimeters", "inches", "feet", "yards"];
            break;
        case "weight":
            options = ["grams", "kilograms", "ounces", "pounds"];
            break;
        case "temperature":
            options = ["Celsius", "Fahrenheit", "Kelvin"];
            break;
    }

    // Populate the options in the select elements
    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        unitFromSelect.appendChild(optionElement);
        unitToSelect.appendChild(optionElement.cloneNode(true));
    });

    // Perform an initial conversion when the unit type changes
    convertUnits();
}

function convertUnits() {
    const input = parseFloat(document.getElementById("unit-input").value);
    const fromUnit = document.getElementById("unit-from").value;
    const toUnit = document.getElementById("unit-to").value;
    let conversionRate;

    // Determine the conversion rate based on the selected unit type
    switch (fromUnit) {
        case "meters":
            if (toUnit === "kilometers") {
                conversionRate = 0.001;
            } else if (toUnit === "centimeters") {
                conversionRate = 100;
            } else if (toUnit === "inches") {
                conversionRate = 39.37;
            } else if (toUnit === "feet") {
                conversionRate = 3.281;
            } else if (toUnit === "yards") {
                conversionRate = 1.094;
            }
            break;
        case "kilograms":
            if (toUnit === "grams") {
                conversionRate = 1000;
            } else if (toUnit === "ounces") {
                conversionRate = 35.274;
            } else if (toUnit === "pounds") {
                conversionRate = 2.205;
            }
            break;
        case "Celsius":
            if (toUnit === "Fahrenheit") {
                conversionRate = (input * 9/5) + 32;
            } else if (toUnit === "Kelvin") {
                conversionRate = input + 273.15;
            }
            break;
    }

    // Calculate the converted value and display the result
    let result;
    if (fromUnit === "Celsius" && (toUnit === "Fahrenheit" || toUnit === "Kelvin")) {
        result = conversionRate;
    } else {
        result = input * conversionRate;
    }
    document.getElementById("conversion-result").textContent = `Result: ${result.toFixed(2)}`;
}

// Currency Conversion
const currencyRates = {
    "USD": 1.0,
    "EUR": 0.85,
    "GBP": 0.75,
    // Add more currency rates here
};

function populateCurrencyOptions() {
    const currencyFromSelect = document.getElementById("currency-from");
    const currencyToSelect = document.getElementById("currency-to");
    currencyFromSelect.innerHTML = "";
    currencyToSelect.innerHTML = "";

    // Populate the options in the select elements
    Object.keys(currencyRates).forEach((currency) => {
        const optionElement = document.createElement("option");
        optionElement.value = currency;
        optionElement.textContent = currency;
        currencyFromSelect.appendChild(optionElement);
        currencyToSelect.appendChild(optionElement.cloneNode(true));
    });

    // Perform an initial conversion when the currency options are populated
    convertCurrency();
}

function convertCurrency() {
    const input = parseFloat(document.getElementById("currency-input").value);
    const fromCurrency = document.getElementById("currency-from").value;
    const toCurrency = document.getElementById("currency-to").value;

    if (!input) {
        document.getElementById("currency-result").textContent = "Result: 0";
        return;
    }

    // Calculate the converted value using predefined currency rates
    const fromRate = currencyRates[fromCurrency];
    const toRate = currencyRates[toCurrency];
    const convertedAmount = (input / fromRate) * toRate;

    document.getElementById("currency-result").textContent = `Result: ${convertedAmount.toFixed(2)}`;
}
