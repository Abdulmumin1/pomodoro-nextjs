import React, { useState, useEffect } from "react";

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerAudio, setTimerAudio] = useState(null);
  const [doneAudio, setDoneAudio] = useState(null);

  useEffect(() => {
    setTimerAudio(
      new Audio(
        "https://www.fesliyanstudios.com/soundeffects/2019-03-8/Original/Clock-Ticking-C-www.fesliyanstudios.com.mp3"
      )
    );
    setDoneAudio(
      new Audio(
        "https://assets.mixkit.co/active_storage/sfx/992/992-preview.mp3"
      )
    );
  }, []);

  useEffect(() => {
    if (timerAudio) {
      timerAudio.loop = true;
    }
    return () => {
      clearInterval(intervalId);
      if (timerAudio) {
        timerAudio.pause();
      }
      if (doneAudio) {
        doneAudio.pause();
      }
    };
  }, [timerAudio, doneAudio]);

  function updateTimer() {
    if (seconds === 0) {
      if (minutes === 0) {
        if (timerAudio && doneAudio) {
          timerAudio.pause();
          doneAudio.play();
        }
        clearInterval(intervalId);
        alert("Session completed!");
        setCompleted(completed + 1);
        setMinutes(25);
        setSeconds(0);
        if (doneAudio) {
          doneAudio.pause();
          doneAudio.currentTime = 0;
        }
        if (timerAudio) {
          timerAudio.currentTime = 0;
        }
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    } else {
      setSeconds(seconds - 1);
    }
  }

  const startTimer = () => {
    setIntervalId(setInterval(updateTimer, 1000));
    if (timerAudio) {
      timerAudio.play();
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    if (timerAudio) {
      timerAudio.pause();
      timerAudio.currentTime = 0;
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setMinutes(25);
    setSeconds(0);
    if (timerAudio) {
      timerAudio.pause();
    }
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
          <button id="start" onClick={startTimer}>
            <i className="fa-solid fa-play"></i> Start
          </button>
          <button id="stop" onClick={stopTimer}>
            <i className="fa-regular fa-circle-stop"></i> Stop
          </button>
          <button id="reset" onClick={resetTimer}>
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
