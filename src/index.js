import "./style.css";
import { createElement } from "./utils/elements";

// !Variables
let startInterval = false;
let counter = 400;

// !Input Functions
function getInput() {
  const inputField = document.querySelector(".input--time");
  if (inputField.value) {
    console.log("InputValue: ", inputField.value);
    return inputField.value;
  }
  console.log("Nichts zum returnen");
}

// !Timer Functions
function countDownOne() {
  counter--;
  const counterNumber = document.querySelector(".timeOutput");
  counterNumber.innerHTML = `${counter}ms`;
  console.log(counterNumber.innerHTML);
}

function startTimer() {
  if (getInput()) {
    counter = getInput();
  }
  if (!startInterval) {
    startInterval = setInterval(countDownOne, 100);
    changeBackgroundOf("red", document.querySelector(".button--stopCount"));
  }
}

function stopTimer() {
  clearInterval(startInterval);
  startInterval = false;
  changeBackgroundOf(
    "rebeccapurple",
    document.querySelector(".button--stopCount")
  );
}

function resetTimer() {
  counter = 400;
  const counterNumber = document.querySelector(".timeOutput");
  counterNumber.innerHTML = `${counter}ms`;
}

// !Helper Functions

function changeBackgroundOf(color, button) {
  button.style.backgroundColor = color;
}

// ! JS to HTML Contructor
function createTimer() {
  const timeOutput = createElement("span", {
    className: "timeOutput",
    innerHTML: `${counter}ms`,
  });

  const timeInput = createElement("input", {
    className: "input--time",
    placeholder: "hh:mm:ss",
  });

  const timerButtonStart = createElement("button", {
    className: "button--startCount",
    innerText: "Count Down",
    onclick: () => startTimer(),
  });

  const timerButtonStop = createElement("button", {
    className: "button--stopCount",
    innerText: "Stop",
    onclick: () => stopTimer(),
  });
  const resetButton = createElement("button", {
    className: "button--reset",
    innerText: "Reset",
    onclick: () => resetTimer(),
  });

  const Container = createElement("div", {
    className: "container",
    children: [
      timeInput,
      timerButtonStart,
      timerButtonStop,
      timeOutput,
      resetButton,
    ],
  });

  return Container;
}

document.body.appendChild(createTimer());
