function subtract(x, y) {
  return x - y;
}
function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  if (y === 0) {
    return "Cannot divide by zero"
  }
  return x / y;
}


function operate(x, opp, y) {
  if (opp === "+") {
    return add(x, y);
  }
  if (opp === "-") {
    return subtract(x, y);
  }
  if (opp === "*") {
    return multiply(x, y);
  }
  if (opp === "/") {
    return divide(x, y);
  }
}

let num1 = "";
let operator = "";
let num2 = "";
let isOperatorSelected = false;

const display = document.querySelector(".display");

function updateDisplayValue(value) {
  display.textContent = value;
}

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (isOperatorSelected) {
      num2 += value;
      updateDisplayValue(`${num1} ${operator} ${num2}`);
    }
    else {
      num1 += value;
      updateDisplayValue(num1);
    }
  })
});

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (num1 === "") return;
    if (num1 && operator && num2) {
      result = operate(parseFloat(num1), operator, parseFloat(num2));
      updateDisplayValue(result);

      num1 = result.toString();
      num2 = "";
      operator = "";
      isOperatorSelected = false;
    }
    operator = button.dataset.operator;
    isOperatorSelected = true;
    updateDisplayValue(`${num1} ${operator}`);
  })
})

const equal = document.querySelector("#equal");

equal.addEventListener("click", () => {
  let result;

  if (num1 && operator && num2) {
    result = operate(parseFloat(num1), operator, parseFloat(num2));
  } else {
    return "";
  }

  updateDisplayValue(result);

  num1 = result.toString();
  num2 = "";
  operator = "";
  isOperatorSelected = false;
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  updateDisplayValue("0")
})