import React, { useEffect, useState, useRef } from "react";
import { TrainingContext } from "./TrainingContext";
import "./styles/Training.css";

const Training = () => {
  const [trainingData, setTrainingData] = React.useContext(TrainingContext);
  const [isPaused, setIsPaused] = React.useState(false);
  const [aboutToStart, setAboutToStart] = React.useState(false);
  const exerciseTimerRef = useRef(null);
  const restTimerRef = useRef(null);

  const initialRepsRef = useRef(trainingData.reps);
  const initialRestRef = useRef(trainingData.rest);

  const startRest = () => {
    restTimerRef.current = setInterval(() => {
      setTrainingData((prevState) => {
        if (prevState.rest > 0) {
          return { ...prevState, rest: prevState.rest - 1 };
        } else {
          clearInterval(restTimerRef.current);
          // Reset rest to initial value when rest reaches 0
          return {
            reps: initialRepsRef.current,
            sets: prevState.sets > 0 ? prevState.sets - 1 : 0,
            rest: initialRestRef.current,
          };
        }
      });
    }, 2000);
  };

  const startExercise = () => {
    exerciseTimerRef.current = setInterval(() => {
      setTrainingData((prevState) => {
        if (prevState.reps > 0) {
          return { ...prevState, reps: prevState.reps - 1 };
        } else if (prevState.sets > 0) {
          clearInterval(exerciseTimerRef.current);
          // Reset reps to initial value and start rest
          startRest();
          return {
            ...prevState,
            reps: initialRepsRef.current,
          };
        } else {
          clearInterval(exerciseTimerRef.current);
          clearInterval(restTimerRef.current);
          return { ...prevState };
        }
      });
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Training is about to start!");
      setAboutToStart(true);
      startExercise();
    }, 3000);

    return () => {
      clearInterval(exerciseTimerRef.current);
      clearInterval(restTimerRef.current);
      clearTimeout(timer);
      console.log("Training component unmounted. Timers cleared.");
    };
  }, []);

  const handleTrainingPause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div id="training-container">
      {!aboutToStart && (
        <div id="load-container">
          <h1 id="training-load">The training will start in 3 seconds</h1>
        </div>
      )}
      {aboutToStart && (
        <div>
          <h2>Training Page</h2>
          <p>Sets: {trainingData.sets}</p>
          <p>Reps: {trainingData.reps}</p>
          <p>Rest: {trainingData.rest}</p>
          <button onClick={handleTrainingPause}>
            {!isPaused ? "Pause" : "Resume"}
          </button>
          <button>Restart</button>
          <button>Reset</button>
          <button>Stop</button>{" "}
        </div>
      )}
    </div>
  );
};

export default Training;
