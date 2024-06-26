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
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Handle sub menu options
    document.getElementById('scientificMode').addEventListener('click', function() {
        alert('Scientific Mode selected. (This mode is not yet implemented.)');
        subMenu.style.display = 'none';
    });
    
    document.getElementById('unitConversion').addEventListener('click', function() {
        alert('Unit Conversion selected. (This mode is not yet implemented.)');
        subMenu.style.display = 'none';
    });
    
    document.getElementById('currencyConversion').addEventListener('click', function() {
        alert('Currency Conversion selected. (This mode is not yet implemented.)');
        subMenu.style.display = 'none';
    });
});
