const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
let targetColor;
let timer;
let score = 0;
let isGameRunning = false;

function startGame() {
    isGameRunning = true;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("feedback").textContent = "";
    document.getElementById("timer").textContent = "00:00";
    clearInterval(timer);
    timer = setInterval(() => {
        const timeElement = document.getElementById("timer");
        let seconds = parseInt(timeElement.textContent.split(":")[1]);
        seconds++;
        if (seconds === 60) {
            seconds = 0;
        }
        timeElement.textContent = `00:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
    generateTargetColor();
    generateColorOptions();
}

function generateTargetColor() {
    const colorIndex = Math.floor(Math.random() * colors.length);
    targetColor = colors[colorIndex];
    document.getElementById("target-color").style.backgroundColor = targetColor;
}

function generateColorOptions() {
    const container = document.getElementById("color-options");
    container.innerHTML = "";
    for (const color of colors) {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;
        colorBox.addEventListener("click", checkMatch);
        container.appendChild(colorBox);
    }
}

function checkMatch(event) {
    const clickedColor = event.target.style.backgroundColor;
    if (clickedColor === targetColor) {
        score++;
        document.getElementById("score").textContent = score;
        document.getElementById("feedback").textContent = "Correct!";
        generateTargetColor();
    } else {
        document.getElementById("feedback").textContent = "Incorrect!";
        event.target.classList.add("wrong");
        setTimeout(() => event.target.classList.remove("wrong"), 300);
    }
}

function restartGame() {
    startGame();
}

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", restartGame);


document.getElementById("restart-button").disabled = true;

  