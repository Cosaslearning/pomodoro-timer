//Pomodoro Timer Variables
let time = document.getElementById("time");
let startBtn = document.getElementById("start_btn");
let resetBtn = document.getElementById("reset_btn");
let pauseBtn = document.getElementById("pause_btn");
let buttons = document.querySelectorAll(".btn");
let focusBtn = document.getElementById("focus");
let shortBreakBtn = document.getElementById("shortbreak");
let longBreakBtn = document.getElementById("longbreak");

let set;
let minCount = 24;
let count = 59;
let paused = true;
let active = "focus";
time.textContent = `${minCount + 1}:00`;

// Appending Zero If Min or Sec Value Less Than 10
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

// Function For Removing Active Color
const removeActiveClr = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("active_btn");
  });
};

// Function For Start Button
startBtn.addEventListener("click", () => {
  resetBtn.classList.add("show");
  pauseBtn.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

// Function For Pause Button
pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
  })
);

// Function For Reset Button
resetBtn.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "focus":
        minCount = 24;
        break;
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

// Function For Short Break Button
shortBreakBtn.addEventListener("click", () => {
  active = "short";
  removeActiveClr();
  shortBreakBtn.classList.add("active_btn");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

// Function For Focus Button
focusBtn.addEventListener("click", () => {
  active = "focus";
  removeActiveClr();
  focusBtn.classList.add("active_btn");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

// Function For Long Break Button
longBreakBtn.addEventListener("click", () => {
  active = "long";
  removeActiveClr();
  longBreakBtn.classList.add("active_btn");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});