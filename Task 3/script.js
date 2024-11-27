const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

let currentInput = "";
let previousInput = "";
let operator = "";

// Function to update the display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Event listener for buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!isNaN(value) || value === ".") {
            currentInput += value;
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = "";
                operator = value;
            }
        }
        updateDisplay(currentInput || previousInput);
    });
});

// Clear button
clear.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("");
});

// Equal button
equal.addEventListener("click", () => {
    if (currentInput && previousInput && operator) {
        let result;
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);

        switch (operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
            case "/":
                result = b !== 0 ? a / b : "Error";
                break;
        }

        updateDisplay(result);
        previousInput = result.toString();
        currentInput = "";
        operator = "";
    }
});
