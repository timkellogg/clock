$(document).ready(function() {
  var breakTimeInterval = 5;
  var workTimeInterval = 25;
  var work = true;
  var currentTimer;
  var timerRunning = false;
  var totalBreakTimeCompleted = 0; // in seconds
  var totalWorkTimeCompleted = 0; // in seconds
  var totalTimeCompleted = totalBreakTimeCompleted + totalWorkTimeCompleted; // in seconds

  renderClockTime();
  renderBreakTimeInterval();
  renderWorkTimeInterval();

  function renderTimeCompleted(type) {
    if (type === "break") {
      var seconds = totalBreakTimeCompleted;
      var selector = $("#total-break");
    } else if (type === "work") {
      var seconds = totalWorkTimeCompleted;
      var selector = $("#total-work");
    } else if (type === "total") {
      var seconds = totalTimeCompleted;
      var selector = $("#total-time");
    }
    var minutes = seconds / 60;
    var wholeMinutes = Math.ceil(minutes)
    var wholeSeconds = 60 + (Math.round((minutes - wholeMinutes) * 60));
    if (wholeSeconds === 60) {
      wholeSeconds = 00;
    }
    if (wholeSeconds.toString().length === 1) {
      wholeSeconds = '0' + wholeSeconds;
    }
    var displayTime = Math.floor(minutes) + ":" + wholeSeconds;
    selector.text(displayTime);
  };

  function renderClockTime() {
    $("#time-left").text(workTimeInterval + ":00");
  };

  function renderWorkTimeInterval() {
    $("#work-time").text(workTimeInterval + ":00");
  }

  function renderBreakTimeInterval() {
    $("#break-time").text(breakTimeInterval + ":00");
  }

  $("#workTimeUp").click(function() {
    if (workTimeInterval === 0) {
      $("#work-time").removeClass("animated bounce")
        .removeClass("text-danger");
    }
    if (workTimeInterval !== 60) {
      workTimeInterval += 1;
      renderWorkTimeInterval();
      renderClockTime();
    }
  });

  $("#breakTimeUp").click(function() {
    if (breakTimeInterval === 0 || breakTimeInterval === 59) {
      $("#break-time").removeClass("animated bounce")
        .removeClass("text-danger");
    }
    if (breakTimeInterval !== 60) {
      breakTimeInterval += 1;
      renderBreakTimeInterval();
      renderClockTime();
    }
  });

  $("#workTimeDown").click(function() {
    if (workTimeInterval > 0) {
      workTimeInterval -= 1;
    } else {
      $("#work-time").addClass("animated bounce")
        .addClass("text-danger");
    }
    renderWorkTimeInterval();
    renderClockTime();
  });

  $("#breakTimeDown").click(function() {
    if (breakTimeInterval > 0) {
      breakTimeInterval -= 1;
    } else {
      $("#break-time").addClass("animated bounce")
        .addClass("text-danger");
    }
    renderBreakTimeInterval();
    renderClockTime();
  });

  $("#timer-face").click(function() {
    if (timerRunning) {
      clearInterval(currentTimer);
      timerRunning = false;
      return false;
    }
    startTimer();
  });

  $("#reset-timer").click(function() {
    renderClockTime();
    work = true;
    clearInterval(currentTimer);
    totalBreakTimeCompleted = 0;
    totalWorkTimeCompleted = 0;
    totalTimeCompleted = totalBreakTimeCompleted + totalWorkTimeCompleted;
    renderTimeCompleted("break");
    renderTimeCompleted("work");
    renderTimeCompleted("total");
  });

  function resetTimer() {
    clearInterval(currentTimer);
    startTimer();
  };

  function updateAggregateTimes(seconds) {
    if (work) {
      totalWorkTimeCompleted += 1;
      renderTimeCompleted("work");
    } else {
      totalBreakTimeCompleted += 1;
      renderTimeCompleted("break");
    }
    totalTimeCompleted += 1;
    renderTimeCompleted("total");
  };

  function startTimer() {
    timerRunning = true;

    if (work) {
      var seconds = workTimeInterval * 60;
    } else {
      var seconds = breakTimeInterval * 60;
    }
    currentTimer = setInterval(function() {
      seconds -= 1;
      updateAggregateTimes();
      if (seconds === 0) {
        $("#time-left").addClass('animated bounce');
        work ? work = false : work = true;
        document.getElementById("sound").play();
        resetTimer();
      }

      var minutes = seconds / 60;
      var wholeMinutes = Math.ceil(minutes)
      var wholeSeconds = 60 + (Math.round((minutes - wholeMinutes) * 60));
      if (wholeSeconds === 60) {
        wholeSeconds = 00;
      }
      if (wholeSeconds.toString().length === 1) {
        wholeSeconds = '0' + wholeSeconds;
      }
      var displayTime = Math.floor(minutes) + ":" + wholeSeconds;

      $("#time-left").text(displayTime);
    }, 1000);
  }
});