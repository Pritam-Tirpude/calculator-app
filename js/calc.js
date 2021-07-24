const allBtns = document.querySelectorAll("button");
const screenDisplay = document.querySelector(".calc-screen h1");
const resetBtn = document.querySelector(".reset-btn");
const delBtn = document.querySelector(".del-btn");
const equalBtn = document.querySelector(".equal-btn");
const theme = document.querySelectorAll('input[type="radio"]');
const themeOne = document.querySelector(".theme-1");
const themeTwo = document.querySelector(".theme-2");
const themeThree = document.querySelector(".theme-3");
const calcTitle = document.querySelector(".calc-title");
const themeTitle = document.querySelector(".theme-title");
const label = document.querySelectorAll("label");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
  if (awaitingNextValue) {
    screenDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const screenValue = screenDisplay.textContent;
    screenDisplay.textContent =
      screenValue === "0" ? number : screenValue + number;
  }
}

function chooseOperation(operator) {
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  const currentValue = Number(screenDisplay.textContent);

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    screenDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function addDecimal() {
  if (awaitingNextValue) return;

  if (!screenDisplay.textContent.includes(".")) {
    screenDisplay.textContent = `${screenDisplay.textContent}.`;
  }
}

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  screenDisplay.textContent = "0";
}

function deleteNumber() {
  screenDisplay.textContent = screenDisplay.textContent.slice(0, -1);
}

allBtns.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => chooseOperation(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  }
});

resetBtn.addEventListener("click", resetAll);
delBtn.addEventListener("click", deleteNumber);

// Themes
function changeTheme(e) {
  if (e === "theme-2") {
    document.documentElement.setAttribute("data-theme", "theme-two");
    delBtn.style.color = "hsl(0, 0%, 100%)";
    resetBtn.style.color = "hsl(0, 0%, 100%)";
    equalBtn.style.color = "hsl(0,0%,100%)";
    calcTitle.style.color = "hsl(60, 10%, 19%)";
    themeTitle.style.color = "hsl(60, 10%, 19%)";
    screenDisplay.style.color = "hsl(60, 10%, 19%)";
    label.forEach((label) => {
      label.style.color = "hsl(60, 10%, 19%)";
    });
    themeOne.checked = false;
    themeThree.checked = false;
  } else if (e === "theme-3") {
    document.documentElement.setAttribute("data-theme", "theme-three");
    equalBtn.style.color = "hsl(268, 71%, 12%)";
    calcTitle.style.color = "hsl(52, 100%, 62%)";
    themeTitle.style.color = "hsl(52, 100%, 62%)";
    screenDisplay.style.color = "hsl(52, 100%, 62%)";
    label.forEach((label) => {
      label.style.color = "hsl(52, 100%, 62%)";
    });
    themeTwo.checked = false;
    themeOne.checked = false;
  } else if (e === "theme-1") {
    document.documentElement.setAttribute("data-theme", "theme-one");
    delBtn.style.color = "hsl(0, 0%, 100%)";
    resetBtn.style.color = "hsl(0, 0%, 100%)";
    equalBtn.style.color = "hsl(0,0%,100%)";
    calcTitle.style.color = "hsl(0,0%,100%)";
    themeTitle.style.color = "hsl(0,0%,100%)";
    screenDisplay.style.color = "hsl(0,0%,100%)";
    label.forEach((label) => {
      label.style.color = "hsl(0,0%,100%)";
    });
    themeTwo.checked = false;
    themeThree.checked = false;
  }
}

theme.forEach((theme) => {
  theme.addEventListener("click", () => changeTheme(theme.value));
});
