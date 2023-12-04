import React, { useContext, useEffect } from "react";
import { TrainingContext } from "./TrainingContext";
import "./styles/Training.css";

const Training = () => {
  const [trainingData, setTrainingData] = React.useContext(TrainingContext);
  const [isPaused, setIsPaused] = React.useState(false);
  const [aboutToStart, setAboutToStart] = React.useState(false);

  const startExercise = () => {
    const timer = setInterval(() => {
      setTrainingData((prevState) => {
        if (prevState.reps > 0) {
          return { ...prevState, reps: prevState.reps - 1 };
        } else if (prevState.sets > 0) {
          return { ...prevState, sets: prevState.sets - 1 };
        } else {
          return { ...prevState };
        }
      });
    }, 2000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAboutToStart(true);
      startExercise();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    console.log("trainingData", trainingData);
  }, [trainingData]);

  const handleTrainingPause = () => {
    // Pause the training
    setIsPaused(!isPaused);
  };

  return (
    <div id="training-container">
      {!aboutToStart && (
        <div id="load-container">
          {" "}
          <h1 id="training-load">The training will start in 3 seconds</h1>
        </div>
      )}
      {aboutToStart && (
        <div>
          <h2>Training Page</h2>
          <p>Sets: {trainingData.sets}</p>
          <p>Reps: {trainingData.reps} </p>
          <p>Rest: {trainingData.rest} </p>
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
