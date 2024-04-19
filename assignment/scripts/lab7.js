// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const menuButton = document.getElementById('menuButton');
    const subMenu = document.getElementById('subMenu');
    
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    
    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            if (value === 'C') {
                // Clear display
                currentInput = '';
                firstOperand = null;
                operator = null;
                display.textContent = '0';
            } else if (value === '=') {
                // Perform calculation
                if (operator && firstOperand !== null) {
                    const secondOperand = parseFloat(currentInput);
                    let result = 0;
                    
                    switch (operator) {
                        case '+':
                            result = firstOperand + secondOperand;
                            break;
                        case '-':
                            result = firstOperand - secondOperand;
                            break;
                        case '*':
                            result = firstOperand * secondOperand;
                            break;
                        case '/':
                            result = firstOperand / secondOperand;
                            break;
                    }
                    
                    display.textContent = result;
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Set operator and store first operand
                operator = value;
                firstOperand = parseFloat(currentInput);
                currentInput = '';
            } else {
                // Append value to current input
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
    
    // Handle menu button click
    menuButton.addEventListener('click', function() {
        // Toggle the submenu display
        subMenu.style.display = (subMenu.style.display === 'block' ? 'none' : 'block');
    });
    
    // Attach event listeners for submenu options
    const scientificModeButton = document.getElementById('scientificMode');
    const unitConversionButton = document.getElementById('unitConversion');
    const currencyConversionButton = document.getElementById('currencyConversion');
    
    scientificModeButton.addEventListener('click', function() {
        loadModeFiles('scientific');
    });
    
    unitConversionButton.addEventListener('click', function() {
        loadModeFiles('conversion');
    });
    
    currencyConversionButton.addEventListener('click', function() {
        loadModeFiles('conversion');
    });
    
    // Function to load mode files based on the selected option
    function loadModeFiles(mode) {
        const modeScript = document.getElementById('modeScript');
        const modeStyle = document.getElementById('modeStyle');
        
        // Update script and style sources based on the selected mode
        if (mode === 'scientific') {
            modeScript.src = 'scripts/scientific.js';
            modeStyle.href = 'styles/scientific.css';
        } else if (mode === 'conversion') {
            modeScript.src = 'scripts/conversion.js';
            modeStyle.href = 'styles/conversion.css';
        } else {
            // Clear mode files if no mode is selected
            modeScript.src = '';
            modeStyle.href = '';
        }
        
        // Hide submenu after selecting an option
        subMenu.style.display = 'none';
    }
});
