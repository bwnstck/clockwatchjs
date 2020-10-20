import "./style.css";
import { createElement } from "./utils/elements";

let startInterval = false;
let counter = 400;

function startTimer() {
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

function changeBackgroundOf(color, button) {
  button.style.backgroundColor = color;
}
function countDownOne() {
  counter--;
  const counterNumber = document.querySelector(".timeOutput");
  counterNumber.innerHTML = `${counter}ms`;
  console.log(counterNumber.innerHTML);
}

function component() {
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

  const Container = createElement("div", {
    className: "container",
    children: [timeInput, timerButtonStart, timerButtonStop, timeOutput],
  });

  return Container;
}

document.body.appendChild(component());
