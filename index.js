const overlay = document.querySelector(".overlay");
overlay.style.opacity = 0;

let pickTime = []
const alarm = new Audio("assets/Alarm Sound Effect.mp3");
let sec = 0;
let min = 0;
let hour = 0;
inputPrompt();
function inputPrompt() {
    pickTime = prompt("Type your second, minute and hour seperate with ','.\nNote: if this prompt popup twice, just do the input.\nMake sure tap or click the web document for better experience.").trim().split(",").map(val => Number(val));

    sec = pickTime[0];
    min = pickTime[1];
    hour = pickTime[2];
    const { msg, error } = checkValidation(sec, min, hour);
    if (error) {
        confirm("Error:\n" + msg.join(",\n"));
        inputPrompt();
    }
}
function checkValidation(sec, min, hour) {
    let errorMsg = {
        msg: [],
        error: false,
    }
    if (sec < 1 || sec > 59) {
        errorMsg.msg.push("Second must be greater than 0 and less than 60");
        errorMsg.error = true;
    };
    if (min < 0 || min > 60) {
        errorMsg.msg.push("Minute must be greater or equal than 0 and less or equal than 60");
        errorMsg.error = true;
    };
    if (hour < 0 || hour > 60) {
        errorMsg.msg.push("Hour must be greater or equal than 0 and less or equal than 60");
        errorMsg.error = true;
    };
    return errorMsg;
}

// const rectFillSec = document.querySelector(".sec .rect .fill");
const textSec = document.querySelector(".sec h3 b");
// const rectFillSecStyle = window.getComputedStyle(rectFillSec);

// const rectFillMin = document.querySelector(".min .rect .fill");
const textMin = document.querySelector(".min h3 b");
// const rectFillMinStyle = window.getComputedStyle(rectFillMin);

// const rectFillHour = document.querySelector(".hour .rect .fill");
const textHour = document.querySelector(".hour h3 b");
// const rectFillHourStyle = window.getComputedStyle(rectFillHour);

const resetBtn = document.querySelector("#reset");
const newTimerBtn = document.querySelector("#new-timer");
const stopBtn = document.querySelector("#stop");

// const topSecFill = rectFillSecStyle["top"].replace("px", "");
// const topMinFill = rectFillMinStyle["top"].replace("px", "");
// const topHourFill = rectFillHourStyle["top"].replace("px", "");


// const overlay = document.querySelector(".overlay");



resetBtn.addEventListener("click", e => {
    overlay.style.opacity = 0;
    alarm.loop = false;
    alarm.pause();
    rectFillCounter(sec, min, hour)
});

stopBtn.addEventListener("click", e => {
    alarm.pause();
});

newTimerBtn.addEventListener("click", e => {
    overlay.style.opacity = 0;
    alarm.loop = false;
    alarm.pause();
    pickTime = prompt("Type your second, minute and hour seperate with ','.\nNote: if this prompt popup twice, just do the input.\nMake sure tap or click the web document for better experience.").trim().split(",").map(val => Number(val));
    sec = pickTime[0];
    min = pickTime[1];
    hour = pickTime[2];
    rectFillCounter(sec, min, hour);
});


let rectFillCounter = (sec, min, hour) => {
    let secCounter = sec;
    let minCounter = min;
    let hourCounter = hour;

    textSec.textContent = secCounter;
    textMin.textContent = minCounter;
    textHour.textContent = hourCounter;
    // console.log(topSecFill);
    // let topPositionRectSec = (sec / 100) * topSecFill;
    // let topPositionRectMin = (min / 100) * topMinFill;
    // let topPositionRectHour = (hour / 100) * topHourFill;

    // const stepSecCounter = Math.abs(topPositionRectSec / sec);
    // const stepMinCounter = Math.abs(topPositionRectMin / min);
    // const stepHourCounter = Math.abs(topPositionRectHour / hour);

    // rectFillSec.style.top = topPositionRectSec + "px";
    // rectFillMin.style.top = topPositionRectMin + "px";
    // rectFillHour.style.top = topPositionRectHour + "px";

    let counter = setInterval(() => {
        if (secCounter < 1 && minCounter < 1 && hourCounter < 1) {
            overlay.style.opacity = 1;
            alarm.loop = true;
            alarm.currentTime = 0;
            alarm.play();
            clearInterval(counter);
            return;
        }
        if (secCounter < 1) {
            secCounter = 60;
            textSec.textContent = secCounter;
            // topPositionRectSec = -191;
            // rectFillSec.style.top = topPositionRectSec + "px";

            // ! Min Div
            minCounter--;
            textMin.textContent = minCounter;
            // topPositionRectMin = Number(topPositionRectMin) + stepMinCounter;
            // rectFillMin.style.top = topPositionRectMin + "px";

            // clearInterval(rectSecFillCounter);   
            // return;
            if (minCounter < 0) {
                minCounter = 59;
                textMin.textContent = minCounter;
                // topPositionRectMin = -191;
                // rectFillMin.style.top = topPositionRectMin + "px";

                if (hourCounter > 0) {
                    hourCounter--;
                    textHour.textContent = hourCounter;
                    // topPositionRectHour = Number(topPositionRectHour) + stepHourCounter;
                    // rectFillHour.style.top = topPositionRectHour + "px";
                }
                // clearInterval(rectMinFillCounter);
                // return;
            };
        }
        // ! Sec Div
        // topPositionRectSec = Number(topPositionRectSec) + stepSecCounter;
        secCounter--;
        textSec.textContent = secCounter;
        // rectFillSec.style.top = topPositionRectSec + "px";


    }, 1000);
}

rectFillCounter(sec, min, hour);