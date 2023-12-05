import React, { useEffect, useRef } from "react";
import { TrainingContext } from "./TrainingContext";
import "./styles/Training.css";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import repSound from "./sounds/rep-sound.wav";
import restStart from "./sounds/countdown-start.wav";

const Training = () => {
  const [trainingData, setTrainingData] = React.useContext(TrainingContext);
  const [aboutToStart, setAboutToStart] = React.useState(false);
  const exerciseTimerRef = useRef(null);
  const restTimerRef = useRef(null);
  const [play] = useSound(repSound);
  const [playRest] = useSound(restStart);

  const originalSetsRef = useRef(trainingData.sets);
  const originalRepsRef = useRef(trainingData.reps);
  const initialRestRef = useRef(trainingData.rest);
  const initialRepLengthRef = useRef(trainingData.repLength);

  const navigate = useNavigate();

  const startRest = () => {
    // Clear any existing rest timer
    clearInterval(restTimerRef.current);

    // Start a new rest timer
    restTimerRef.current = setInterval(() => {
      setTrainingData((prevState) => {
        if (prevState.rest > 0) {
          return { ...prevState, rest: prevState.rest - 1 };
        } else {
          // Reset rest to initial value when rest reaches 0
          clearInterval(restTimerRef.current);
          return {
            reps: originalRepsRef.current,
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
            reps: originalRepsRef.current,
          };
        } else {
          clearInterval(exerciseTimerRef.current);
          clearInterval(restTimerRef.current);
          return { ...prevState };
        }
      });
    }, initialRepLengthRef.current * 1000);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainingData.sets]);

  const handleRestart = () => {
    setTrainingData({
      sets: originalSetsRef.current,
      reps: originalRepsRef.current,
      rest: initialRestRef.current,
    });
  };

  const handleReset = () => {
    setTrainingData({
      sets: "",
      reps: "",
      rest: "",
    });
    navigate("/");
  };

  //play sound when reps are decremented
  useEffect(() => {
    if (trainingData.reps >= 0) {
      play();
    }
  }, [trainingData.reps, play]);

  //play sound when rest starts decrementing from initial value and when it resets

  useEffect(() => {
    if (trainingData.rest === initialRestRef.current) {
      playRest();
    }
  }, [trainingData.rest, playRest]);

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
          <p>
            <strong>Sets: </strong>
            {trainingData.sets}
          </p>
          <p>
            <strong>Reps:</strong> {trainingData.reps}
          </p>
          <p>
            <strong>Rest: </strong>
            {trainingData.rest}
          </p>
          <div id="action-buttons">
            {" "}
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={() => alert("Training stopped")}>Stop</button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;
