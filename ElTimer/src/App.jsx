import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [field, setField] = useState({});
	const [fieldSaved, setFieldSaved] = useState({});

	const [go, setGo] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setField((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFieldSaved(field);
		setGo(true);
		console.log(field);
	};

	useEffect(() => {
		if (go && field.reps === "1" && field.nReps > 0) {
			const interval = setInterval(() => {
				setField((prev) => ({ ...prev, nReps: prev.nReps - 1 }));
			}, 2000);
			return () => clearInterval(interval);
		}

		if (go && field.reps === "2" && field.nReps > 0) {
			const interval = setInterval(() => {
				setField((prev) => ({ ...prev, nReps: prev.nReps - 1 }));
			}, 4000);
			return () => clearInterval(interval);
		}

		if (go && field.reps === "3" && field.nReps > 0) {
			const interval = setInterval(() => {
				setField((prev) => ({ ...prev, nReps: prev.nReps - 1 }));
			}, 6000);
			return () => clearInterval(interval);
		}
	}, [go, field, fieldSaved]);

	useEffect(() => {
		if (go && field.nReps === "0") {
			setField((prev) => ({ ...prev, sets: prev.sets - 1 }));
			setField((prev) => ({ ...prev, nReps: fieldSaved.nReps }));
		}
	}, [go, field, fieldSaved]);

	return (
		<>
			{!go && (
				<form
					action=''
					style={{ display: "flex", flexDirection: "column" }}>
					<label htmlFor='sets'>Serie</label>
					<input
						type='text'
						name='sets'
						onChange={handleChange}
					/>
					<label htmlFor='reps'>Ripetizioni</label>
					<input
						type='text'
						name='nReps'
						onChange={handleChange}
					/>
					<select
						name='reps'
						onChange={handleChange}>
						<option value='0'>Seleziona</option>
						<option value='1'>Normal</option>
						<option value='2'>Doppio tempo</option>
						<option value='3'>Triplo tempo</option>
					</select>
					<label htmlFor='rest'>Riposo</label>
					<input
						onChange={handleChange}
						type='text'
						name='rest'
					/>
					<button onClick={handleSubmit}>GO</button>
				</form>
			)}
			{go && (
				<div>
					<h1> set {field.sets}</h1>
					<h1>ripetizioni {field.nReps}</h1>
					{/* <h1>{field.reps}</h1> */}
					<h1>riposo {field.rest}</h1>

					<button onClick={() => setGo(false)}>Stop</button>
				</div>
			)}
		</>
	);
}

export default App;
