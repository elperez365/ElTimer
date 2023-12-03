import React, { useContext, useEffect, useState } from "react";
import { TrainingContext } from "./TrainingContext";

const Training = () => {
  const { trainingData, setTrainingData } = React.useContext(TrainingContext);
  const [localSets, setLocalSets] = useState("");
  const [localReps, setLocalReps] = useState("");
  const [localRest, setLocalRest] = useState("");

  React.useEffect(() => {
    console.log("trainingData", trainingData);
  }, [trainingData]);

  return (
    <div>
      <h2>Training Page</h2>
      <p>Sets:</p>
      <p>Reps: </p>
      <p>Rest: </p>
      {/* ... rest of your component */}
    </div>
  );
};

export default Training;
