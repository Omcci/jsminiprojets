let sum = 1000;
let segment = 0;
let progressBar;
let interval;

let initialisation = function () {
  progressBar = document.getElementById("progressBar");
  progressBar.value = segment;
  progressBar.max = sum;
};

let displayBar = function () {
  segment++;

  if (segment >= sum) {
    clearInterval(interval);
  }

  progressBar.value = segment;
};

window.onload = function () {
  initialisation();
  interval = setInterval(displayBar, 10);
};
