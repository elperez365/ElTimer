import "./App.css";
import React from "react";
import GymTimer from "./GymTimer";
import { TrainingContext } from "./TrainingContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Training from "./Training";

function App() {
  const [trainingData, setTrainingData] = React.useState({
    sets: "",
    reps: "",
    rest: "",
    repLength: 2,
  });
  return (
    <TrainingContext.Provider value={[trainingData, setTrainingData]}>
      <Router>
        <Routes>
          <Route path="/" element={<GymTimer />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </Router>
    </TrainingContext.Provider>
  );
}

export default App;
