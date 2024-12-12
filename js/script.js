let mode = 'timer';
let interval;
let seconds = 0;
let timerTime = 60;
let stopwatchTime = 0;
let isRunning = false;
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timeInput = document.getElementById('time-input');
const timerSettings = document.getElementById('timer-settings');
const stopwatchSettings = document.getElementById('stopwatch-settings');
const timerModeBtn = document.getElementById('timer-mode');
const stopwatchModeBtn = document.getElementById('stopwatch-mode');

const alarmSound = new Audio('./audio/signal-elektronnogo-budilnika-33304.mp3');

timerModeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mode = 'timer';
  timerModeBtn.classList.add('active');
  stopwatchModeBtn.classList.remove('active');
  timerSettings.style.display = 'block';
  stopwatchSettings.style.display = 'none';
  resetTimer();
});

stopwatchModeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mode = 'stopwatch';
  stopwatchModeBtn.classList.add('active');
  timerModeBtn.classList.remove('active');
  timerSettings.style.display = 'none';
  stopwatchSettings.style.display = 'block';
  resetStopwatch();
});

startBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(interval);
    startBtn.textContent = 'Старт';
  } else {
    startBtn.textContent = 'Пауза';
    if (mode === 'timer') {
      startTimer();
    } else {
      startStopwatch();
    }
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
  if (mode === 'timer') {
    resetTimer();
  } else {
    resetStopwatch();
  }
  startBtn.textContent = 'Старт';
  isRunning = false;
});

function startTimer() {
  seconds = parseInt(timeInput.value);
  interval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(interval);
      alarmSound.play();
      alert('Время вышло!');
    } else {
      seconds--;
      updateTimeDisplay(seconds);
    }
  }, 1000);
}

function startStopwatch() {
  interval = setInterval(() => {
    stopwatchTime++;
    updateTimeDisplay(stopwatchTime);
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  seconds = parseInt(timeInput.value);
  updateTimeDisplay(seconds);
}

function resetStopwatch() {
  clearInterval(interval);
  stopwatchTime = 0;
  updateTimeDisplay(stopwatchTime);
}

function updateTimeDisplay(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  timeDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

updateTimeDisplay(timerTime);
