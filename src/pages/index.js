import React, { useState, useEffect } from "react";

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            handleSessionComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    setCompleted(completed + 1);
    alert("Session completed!");
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="container">
      <h1>
        <i className="fa-solid fa-hourglass-start"></i>
      </h1>
      <h1>Pomodoro Timer</h1>
      <div id="timer">
        <div id="time">{`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</div>
        <div id="controls">
          <button id="start" onClick={handleStart}>
            <i className="fa-solid fa-play"></i> Start
          </button>
          <button id="stop" onClick={handleStop}>
            <i className="fa-regular fa-circle-stop"></i> Stop
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa-solid fa-stopwatch"></i> Reset
          </button>
        </div>
      </div>
      <div className="sessions">
        <p>
          Completed sessions: <span id="completed-sessions">{completed}</span>
        </p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
