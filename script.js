// Function to add a trailing zero to single-digit numbers
function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}

// Stopwatch variables
let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMilliseconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

// Stopwatch function
function stopwatch() {
  stopwatchMilliseconds++;
  if (stopwatchMilliseconds === 100) {
    stopwatchMilliseconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMilliseconds));
}

// Function to start the stopwatch
function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

// Function to stop the stopwatch
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMilliseconds = 0;
  laps = 0;
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
  $(".laps").html("");
}

// Event listeners for stopwatch buttons
$(document).ready(function() {
  $(".start-stopwatch").click(function () {
    startStopwatch();
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
  });

  $(".stop-timer").click(function () {
    stopStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
  });

  $(".lap-stopwatch").click(function () {
    laps++;
    $(".lap").removeClass("active");
    $(".laps").prepend(
      `<div class="lap active">
        <p>Lap ${laps}</p>
        <p>
          ${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}:${addTrailingZero(stopwatchSeconds)}:${addTrailingZero(stopwatchMilliseconds)}
        </p>
      </div>`
    );
  });

  $(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
  });

  $(".back-btn").click(function () {
    $(".main-container > div").slideUp();
    $(".clock").slideDown();
    $(".type").html("Clock");
  });
});
