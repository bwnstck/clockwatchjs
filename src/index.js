import "./style.css";
import { createElement } from "./utils/elements";

function component() {
  const timeOutput = createElement("span", {
    className: "timeOutput",
    innerText: "1000",
  });
  const timeInput = createElement("input", {
    className: "input--time",
    placeholder: "hh:mm:ss",
  });

  const timerButton = createElement("button", {
    className: "button--startCount",
    innerText: "Count",
  });
  const Container = createElement("div", {
    className: "container",
    children: [timeInput, timerButton, timeOutput],
  });

  return Container;
}

document.body.appendChild(component());
