let highScore = localStorage.getItem("highScore") || 0;
let highScoreDisplay = document.getElementById("highScore");
highScoreDisplay.innerText = `Highest Score: ${highScore}`;

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("#start-text")
let startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function () {
    if (started === false) {
        console.log("game is started by click");
        started = true;

        startBtn.classList.add("hide");

        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}



function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("same value");
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = `Highest Score: ${highScore}`
        }

        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Click "Start Game" to play again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    startBtn.disabled = false;

    startBtn.classList.add("blink");
    setTimeout(() => {
        startBtn.classList.remove("blink");
    }, 1000);
} 

