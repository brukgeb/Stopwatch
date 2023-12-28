const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;

    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;

    }
}
function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00:00';
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let h = Math.floor(elapsedTime / (1000 * 60 * 60));
    let m = Math.floor(elapsedTime / (1000 * 60) % 60);
    let s = Math.floor(elapsedTime / 1000 % 60);
    let ms = Math.floor(elapsedTime % 1000 / 10);
    h = String(h).padStart(2, '0')
    m = String(m).padStart(2, '0')
    s = String(s).padStart(2, '0')
    ms = String(ms).padStart(2, '0')
    display.textContent = `${h}:${m}:${s}:${ms}`
}