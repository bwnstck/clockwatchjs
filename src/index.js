import "./style.css";
import { createElement } from "./utils/elements";

let counter = 400;

function countDownOne() {
  counter--;
  const counterNumber = document.querySelector(".timeOutput");
  counterNumber.innerHTML = counter;
  console.log(counterNumber.innerHTML);
}

function component() {
  const timeOutput = createElement("span", {
    className: "timeOutput",
    innerText: counter,
  });

  const timeInput = createElement("input", {
    className: "input--time",
    placeholder: "hh:mm:ss",
  });

  const timerButton = createElement("button", {
    className: "button--startCount",
    innerText: "Count",
    onclick: () => {
      countDownOne();
      console.log("counter", counter);
    },
  });
  const Container = createElement("div", {
    className: "container",
    children: [timeInput, timerButton, timeOutput],
  });

  return Container;
}

document.body.appendChild(component());
