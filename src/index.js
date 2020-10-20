import "./style.css";
import { createElement } from "./utils/elements";

// !Variables

let startInterval = false;
let sec = 0;
let min = 20;
let h = 0;

let counter = timeToSeconds({ h: h, m: min, s: sec });

// !Input Functions

function getInput() {
  const inputFieldValue = document.querySelector(".input--time").value;

  if (inputFieldValue) {
    return inputValidation(inputFieldValue);
  } else {
    counter = 0;
    console.log("Nichts zu returnen");
  }
}

function timeToSeconds(timeObj) {
  let seconds = timeObj.h * 3600 + timeObj.m * 60 + timeObj.s;
  return seconds;
}

function inputValidation(value) {
  let stringValueLength = value.toString().length;

  if (value) {
    if (stringValueLength <= 2) {
      sec = value;
      return timeToSeconds({ h: 0, m: 0, s: Number(sec) });
    }
    if (stringValueLength === 3) {
      min = value.slice(0, 1);
      sec = value.slice(1, 3);
      return timeToSeconds({ h: 0, m: Number(min), s: Number(sec) });
    }
    if (stringValueLength === 4) {
      min = value.slice(0, 2);
      sec = value.slice(2, 4);
      return timeToSeconds({ h: 0, m: Number(min), s: Number(sec) });
    }
    if (stringValueLength === 5) {
      h = value.slice(0, 1);
      min = value.slice(1, 3);
      sec = value.slice(3, 5);
      return timeToSeconds({ h: Number(h), m: min, s: sec });
    }
    if (stringValueLength === 6) {
      h = value.slice(0, 2);
      min = value.slice(2, 4);
      sec = value.slice(4, 6);
      return timeToSeconds({
        h: Number(h),
        m: Number(min),
        s: Number(sec),
      });
    }
    if (stringValueLength >= 7) {
      console.log("Too many digits");
      return;
    }
  } else {
    return;
  }
}

// !Timer Functions
function countDownOne() {
  const counterNumber = document.querySelector(".timeOutput");
  if (counter > 0) {
    counter--;
  } else {
    stopTimer();
    return;
  }
  counterNumber.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
}

function startTimer() {
  if (getInput()) {
    counter = timeToSeconds({ h: Number(h), m: Number(min), s: Number(sec) });
    const inputText = document.querySelector(".input--time");
    inputText.value = 0;
    const outputText = document.querySelector(".timeOutput");
    outputText.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
  }
  if (!startInterval) {
    startInterval = setInterval(countDownOne, 1000);

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

function resetTimer(inputField, outputField) {
  if (getInput() != undefined) {
    sec = 0;
    min = 0;
    h = 0;
    counter = 0;
    inputField.innerHTML = `${counter} Sekunden`;
    outputField.innerHTML = `${counter} Sekunden`;
  } else {
    return;
  }
}

// !Helper Functions

function changeBackgroundOf(color, button) {
  button.style.backgroundColor = color;
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

// ! JS to HTML Contructor
function createTimer() {
  const title = createElement("h1", {
    className: "pageTitle",
    innerText: "⏱Final⏱ Countdown",
  });
  const explanation = createElement("p", {
    className: "explanation",
    innerHTML: "11 = 11 sec <br> 120 = 1min20sec <br> 1000 = 10min",
  });
  const timeOutput = createElement("span", {
    className: "timeOutput",
    innerHTML: `${String(counter).toHHMMSS()} Sekunden`,
  });

  const timeInput = createElement("input", {
    className: "input--time",
    placeholder: "hh:mm:ss",
    min: 1,
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
    onclick: () => resetTimer(timeOutput, timeInput),
  });

  const formContainer = createElement("form", {
    className: "formContainer",
    children: [],
  });
  const Container = createElement("div", {
    className: "container",
    children: [
      title,
      explanation,
      formContainer,
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
