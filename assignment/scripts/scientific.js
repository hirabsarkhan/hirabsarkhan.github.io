// Add scientific mode functionality here

// Function to enable scientific mode
function enableScientificMode() {
    const display = document.getElementById('display');
    const buttonContainer = document.getElementById('buttonContainer');
    
    // Add additional scientific buttons
    const scientificButtons = `
        <button class="btn scientific-btn" data-value="^">^</button>
        <button class="btn scientific-btn" data-value="√">√</button>
        <button class="btn scientific-btn" data-value="sin">sin</button>
        <button class="btn scientific-btn" data-value="cos">cos</button>
        <button class="btn scientific-btn" data-value="tan">tan</button>
    `;
    
    // Append the scientific buttons to the button container
    buttonContainer.innerHTML += scientificButtons;
    
    // Handle scientific button clicks
    const buttons = document.querySelectorAll('.scientific-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Handle scientific mode operations
            if (value === '^') {
                // Exponentiation
                const base = parseFloat(display.textContent);
                currentInput = '';
                // Add logic to handle exponentiation
            } else if (value === '√') {
                // Square root
                const num = parseFloat(display.textContent);
                display.textContent = Math.sqrt(num);
            } else {
                // Trigonometric functions
                const num = parseFloat(display.textContent);
                
                if (value === 'sin') {
                    display.textContent = Math.sin(num).toFixed(4);
                } else if (value === 'cos') {
                    display.textContent = Math.cos(num).toFixed(4);
                } else if (value === 'tan') {
                    display.textContent = Math.tan(num).toFixed(4);
                }
            }
        });
    });
}

// Enable scientific mode when the script loads
document.addEventListener('DOMContentLoaded', enableScientificMode);
