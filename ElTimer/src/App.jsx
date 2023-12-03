import "./App.css";
import React from "react";
import GymTimer from "./GymTimer";
import { TrainingContext } from "./TrainingContext";

//Purpouse: To create a timer for the gym, that notify you every rep, notify start and end of rest time, notify as well 5 seconds before the end of the rest time, and notify the end of the set.
//The timer should be able to be setted by the user, so he can choose the number of sets, the number of reps, the type of reps (normal, double time, triple time), the rest time between sets.
//The timer should be able to be paused and restarted.
//The timer should be able to be resetted.
//The timer should be able to be stopped.
//The timer should be able to be setted again, after it has been stopped.

function App() {
  const [trainingData, setTrainingData] = React.useState({
    sets: "",
    reps: "",
    rest: "",
  });
  return (
    <TrainingContext.Provider value={[trainingData, setTrainingData]}>
      <>
        <div className="App">
          <GymTimer />
        </div>
      </>
    </TrainingContext.Provider>
  );
}

export default App;
