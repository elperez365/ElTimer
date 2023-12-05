import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TrainingContext } from "./TrainingContext";

const GymTimer = () => {
  const [trainingData, setTrainingData] = React.useContext(TrainingContext);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    switch (e.target.name) {
      case "sets":
        setTrainingData((prevData) => ({ ...prevData, sets: e.target.value }));
        break;
      case "reps":
        setTrainingData((prevData) => ({ ...prevData, reps: e.target.value }));
        break;
      case "rest":
        setTrainingData((prevData) => ({ ...prevData, rest: e.target.value }));
        break;
      default:
        break;
    }
  };

  const handleStart = () => {
    if (
      trainingData.sets === "" ||
      trainingData.reps === "" ||
      trainingData.rest === ""
    ) {
      alert("Please fill all the fields");
      return;
    } else if (
      trainingData.sets <= 0 ||
      trainingData.reps <= 0 ||
      trainingData.rest <= 0
    ) {
      alert("Please fill all the fields with a number greater than 0");
      return;
    } else if (
      trainingData.sets > 100 ||
      trainingData.reps > 100 ||
      trainingData.rest > 100
    ) {
      alert("Please fill all the fields with a number lower than 100");
      return;
    } else {
      setTrainingData((prevData) => ({
        ...prevData,
        sets: parseInt(prevData.sets),
        reps: parseInt(prevData.reps),
        rest: parseInt(prevData.rest),
      }));

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
          value={trainingData.sets}
          variant="outlined"
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Reps"
          name="reps"
          value={trainingData.reps}
          variant="outlined"
          onChange={handleChanges}
        />
        <TextField
          id="outlined-basic"
          label="Rest"
          name="rest"
          value={trainingData.rest}
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
