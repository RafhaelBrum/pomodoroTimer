const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const btnStart = document.getElementById('start');
const btnReset = document.getElementById('reset');

let setTime = 0;
let futureTime = 0;
let timerLoop;


timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>`;

function playSound() {
    const beepSound = document.getElementById('beep');
    beepSound.play();
}

function changeColor(color) {
    document.body.style.backgroundColor = color;
    semicircles.forEach(semicircle => {
        semicircle.style.backgroundColor = color;
    });
}

function goToWork() {
    clearInterval(timerLoop);
    setTime = 25 * 60 * 1000;

    timer.innerHTML = `
    <div>25</div>
    <div class="colon">:</div>
    <div>00</div>`;

    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(180deg)';
    semicircles[1].style.transform = `rotate(360deg)`;
    hideResetButton();
    showStartButton();
    changeColor("red");

}

function goToBreak() {
    clearInterval(timerLoop);
    setTime = 5 * 60 * 1000;

    timer.innerHTML = `
    <div>05</div>
    <div class="colon">:</div>
    <div>00</div>`;

    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(180deg)';
    semicircles[1].style.transform = `rotate(360deg)`;
    hideResetButton();
    showStartButton();
    changeColor("blue");

}

function start() {
    clearInterval(timerLoop);
    const startTime = Date.now();
    futureTime = startTime + setTime;

    countdownTimer();
    timerLoop = setInterval(countdownTimer, 1000);
    hideStartButton();
    showResetButton();
}

function countdownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if (angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
    `;

    if (remainingTime < 0) {
        clearInterval(timerLoop);
        playSound();
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
         <div>00</div>
         <div class="colon">:</div>
         <div>00</div>
         `;

        timer.style.color = 'black';
    }
}

function hideStartButton() {
    btnStart.style.display = 'none';
}

function showResetButton() {
    btnReset.style.display = 'inline-block';
}

function hideResetButton() {
    btnReset.style.display = 'none';
}

function showStartButton() {
    btnStart.style.display = 'inline-block';
}

const btnPlay = document.getElementById('start');
btnPlay.addEventListener('click', start);
