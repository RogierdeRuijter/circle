// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
// const WARNING_THRESHOLD = 10;

let COLOR_CODES = {
  info: {
    color: "gray",
  },
  // warning: {
  //   color: "orange",
  //   threshold: WARNING_THRESHOLD,
  // },
  alert: {
    color: "red",
    threshold: undefined,
  },
};

let timePassed = 0;
let timeLimit;
let timeLeft;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

// startTimer();
// TODO: make name ready for external use
function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer(infoTime, alertTime) {
  COLOR_CODES.alert.threshold = alertTime;

  timeLimit = infoTime + alertTime;
  timeLeft = infoTime + alertTime;

  // console.log(`timeLimit ${timeLimit}`);
  // console.log(`timeLeft ${timeLeft}`);

  document.getElementById("next-turn-timer").innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="0"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
    </div>
  `;

  // console.log(timeLimit);

  timerInterval = setInterval(() => {
    timePassed = Number(Number.parseFloat(timePassed + 0.1).toPrecision(2));
    timeLeft = Number(Number.parseFloat(timeLimit - timePassed).toPrecision(2));

    setCircleDasharray();
    // setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      timePassed = 0;
      // TODO: figure out if the old time is set here
      timeLeft = timeLimit;
    }
  }, 100);
}

// TODO: remove no longer needed
// function formatTime(time) {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }

//   return `${minutes}:${seconds}`;
// }

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  if (timeLeft <= alert.threshold) {
    // document
    //   .getElementById("base-timer-path-remaining")
    //   .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  }
  // else if (timeLeft <= warning.threshold) {
  //   document
  //     .getElementById("base-timer-path-remaining")
  //     .classList.remove(info.color);
  //   document
  //     .getElementById("base-timer-path-remaining")
  //     .classList.add(warning.color);
  // }
}

function setColorToRed() {
  // console.log("in setColorToRed");
  const { alert } = COLOR_CODES;
  document
    .getElementById("base-timer-path-remaining")
    .classList.add(alert.color);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const fraction = (
    FULL_DASH_ARRAY -
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0);

  // console.log(fraction);

  const circleDasharray = `${fraction > 0 ? fraction : 0} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
