import "./style.css";
import { createElement } from "./utils/elements";

// !Variables

let startInterval = false;
let h = 0;
let min = 10;
let sec = 0;

let counter = timeToSeconds({ h: h, m: min, s: sec });
console.log("Inital Counter", counter);
// !Input Functions

function getExistingInput() {
  const inputFieldValue = document.querySelector(".input--time").value;

  if (inputFieldValue) {
    return inputToSeconds(inputFieldValue);
  } else {
    // counter = 0;
    console.log("Nichts zu returnen");
    return false;
  }
}

function timeToSeconds(timeObj) {
  let seconds = timeObj.h * 3600 + timeObj.m * 60 + timeObj.s;
  return seconds;
}

function inputToSeconds(value) {
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

function scaleUp(element, time) {
  setTimeout(() => {
    element.style.transform = "scale(1.5)";
  }, time);
}
function scaleDown(element, time) {
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, time);
}

// !Timer Functions
function countDownOne() {
  if (counter > 0) {
    counter--;
  } else {
    stopTimer();
    const rumbleBox = document.querySelector(".timeOutput");
    scaleUp(rumbleBox, 0);
    scaleDown(rumbleBox, 200);
    scaleUp(rumbleBox, 400);
    scaleDown(rumbleBox, 600);
  }
  const counterNumber = document.querySelector(".timeOutput");
  counterNumber.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
}

function startTimer() {
  console.log("Später counter", counter);
  if (counter > 0) {
    if (!startInterval) {
      startInterval = setInterval(countDownOne, 1000);

      changeBackgroundOf("red", document.querySelector(".button--stopCount"));
    }
  }
  if (getExistingInput()) {
    counter = getExistingInput();
    // Input Reset
    const inputText = document.querySelector(".input--time");
    inputText.value = 0;

    const outputText = document.querySelector(".timeOutput");
    outputText.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
  } else {
  }
}
function stopTimer() {
  clearInterval(startInterval);
  startInterval = false;
  changeBackgroundOf(
    "rgb(99, 6, 26)",
    document.querySelector(".button--stopCount")
  );
}

function resetTimer(inputField, outputField) {
  if (getExistingInput() != undefined) {
    sec = 0;
    min = 10;
    h = 0;
    counter = timeToSeconds({ h: h, m: min, s: sec });
    console.log("counter", counter);

    inputField.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
    outputField.innerHTML = `${String(counter).toHHMMSS()} Sekunden`;
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
    innerHTML: " <br>11 = 11 sec <br> 120 = 1min20sec <br> 1000 = 10min",
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

  const mainTimer = createElement("div", {
    className: "mainTimer",
    children: [timeInput, timerButtonStart, timerButtonStop],
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
      mainTimer,
      timeOutput,
      resetButton,
    ],
  });

  return Container;
}

document.body.appendChild(createTimer());
