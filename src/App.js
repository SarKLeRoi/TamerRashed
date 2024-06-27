import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-06-30T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="time-section">
        <span className="time">{timeLeft[interval]}</span>
        <span className="label">{interval}</span>
      </div>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>فضيحة تامر راشد</h1>
        <div className="timer">
          {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
      </header>
    </div>
  );
};

export default App;
