let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const laps = document.getElementById('laps');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Format the time
function formatTime(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Start/Stop Timer
function startStopTimer() {
    if (!isRunning) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(() => {
            updatedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(updatedTime);
        }, 10);
        isRunning = true;
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('running');
        lapResetBtn.textContent = 'Lap';
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('running');
        lapResetBtn.textContent = 'Reset';
    }
}

// Record Lap or Reset
function lapOrReset() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = `Lap ${++lapCount}: ${timeDisplay.textContent}`;
        laps.prepend(li);
    } else {
        difference = 0;
        updatedTime = 0;
        timeDisplay.textContent = '00:00:00';
        laps.innerHTML = '';
        lapCount = 0;
    }
}

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    } else {
        themeToggleBtn.textContent = 'Switch to Light Mode';
    }
}

// Event Listeners
startStopBtn.addEventListener('click', startStopTimer);
lapResetBtn.addEventListener('click', lapOrReset);
themeToggleBtn.addEventListener('click', toggleTheme);
