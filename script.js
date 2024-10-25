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

      if (typeof result === "number" && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(4))
      }
      updateDisplayValue(result);

      num1 = result.toString();
      num2 = "";
      // operator = "";
    }

    operator = button.dataset.operator;
    isOperatorSelected = true;
    isDecimalInNum2 = false;

    updateDisplayValue(`${num1} ${operator}`);


  })
})

const equal = document.querySelector("#equal");

equal.addEventListener("click", () => {
  let result;

  if (num1 && operator && num2) {
    result = operate(parseFloat(num1), operator, parseFloat(num2));

    if (typeof result === "number" && !Number.isInteger(result)) {
      result = parseFloat(result.toFixed(4))
    }
  } else {
    return "";
  }

  updateDisplayValue(result);

  num1 = result.toString();
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  isDecimalInNum1 = num1.includes(".");
  isDecimalInNum2 = false;
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  isDecimalInNum1 = false;
  isDecimalInNum2 = false;
  updateDisplayValue("0")
})

const decimalButton = document.querySelector(".decimal-button");

let isDecimalInNum1 = false;
let isDecimalInNum2 = false;

decimalButton.addEventListener("click", () => {

  if (!operator) {

    if (!isDecimalInNum1 && !num1.includes(".")) {
      if (num1 === "") num1 = "0"
      num1 += ".";
      updateDisplayValue(num1);
      isDecimalInNum1 = true;
    }

  } else {

    if (!isDecimalInNum2 && !num2.includes(".")) {
      if (num2 === "") num2 = "0"
      num2 += ".";
      updateDisplayValue(`${num1} ${operator} ${num2}`);
      isDecimalInNum2 = true;
    }
  }
});

const percent = document.querySelector("#percent");

percent.addEventListener("click", () => {

  if (num1 && !operator && !num2) {
    num1 = ((parseFloat(num1) / 100).toFixed(4)).toString();
    updateDisplayValue(num1);
  }

  if (num1 && operator && num2) {
    num2 = ((parseFloat(num2) / 100).toFixed(4)).toString();
    updateDisplayValue(`${num1} ${operator} ${num2}`);
  }
});

const negateButton = document.querySelector(".negate");
negateButton.addEventListener("click", () => {

  if (num1 && !operator && !num2) {
    num1 = (parseFloat(num1) * (-1)).toString();
    updateDisplayValue(num1);
  }

  if (num1 && operator && num2) {

    num2 = (parseFloat(num2) * (-1)).toString();
    updateDisplayValue(`${num1} ${operator} ${num2}`);
  }
});

const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener('click', () => {

  display.textContent = display.textContent.slice(0, -1);

  if (display.textContent === '') {
    display.textContent = '0';
  }
});