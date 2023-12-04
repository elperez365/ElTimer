import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TrainingContext } from "./TrainingContext";

const GymTimer = () => {
  const [trainingData, setTrainingData] = React.useContext(TrainingContext);
  const [localSets, setLocalSets] = React.useState("");
  const [localReps, setLocalReps] = React.useState("");
  const [localRest, setLocalRest] = React.useState("");

  const [start, setStart] = React.useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    switch (e.target.name) {
      case "sets":
        setLocalSets(e.target.value);
        break;
      case "reps":
        setLocalReps(e.target.value);
        break;
      case "rest":
        setLocalRest(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleStart = () => {
    if (localSets === "" || localReps === "" || localRest === "") {
      alert("Please fill all the fields");
      return;
    } else if (localSets <= 0 || localReps <= 0 || localRest <= 0) {
      alert("Please fill all the fields with a number greater than 0");
      return;
    } else if (localSets > 100 || localReps > 100 || localRest > 100) {
      alert("Please fill all the fields with a number lower than 100");
      return;
    } else {
      trainingData.sets = localSets;
      trainingData.reps = localReps;
      trainingData.rest = localRest;
      console.log("trainingData", trainingData);
      setTrainingData(trainingData);
      setStart(true);
      navigate("/training");
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          border: "2px solid black",
          borderRadius: "1rem",
          backgroundColor: "lightgrey",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Sets"
          name="sets"
          value={localSets}
          variant="outlined"
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Reps"
          name="reps"
          value={localReps}
          variant="outlined"
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Rest"
          name="rest"
          value={localRest}
          variant="outlined"
          onChange={handleChanges}
        />

        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
      </Box>
    </div>
  );
};

export default GymTimer;
