import React from 'react'
import { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap';

const oneOrTwoNum = (num) => num > 9 ? num : `0${num}`
const pluralSingular = (num) => num > 1 ? "s" : ""
const ONE_SECOND_TO_MILLISECOND = 1000

export default function StopwatchTimer() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);

	const [stateIntervalSeconds, setIntervalSeconds] = useState(null);
	const [stateIntervalMinutes, setIntervalMinutes] = useState(null);
	const [stateIntervalHours, setIntervaHours] = useState(null);

	const [velocity, setVelocity] = useState(0);
	const [velocityName, setVelocityName] = useState("");

	const timerInitialState = { seconds: 0, minutes: 0, hours: 0 };
 	const [timer, setTimer] = useState(timerInitialState);
	 const [intervalState, setIntervalState] = useState(null);


	const handleStart =() => {		
		
		const interval = setInterval(
			() => {
			  setTimer((t) => {
				if (t.seconds === 59) {
				  return { ...t, seconds: 0, minutes: t.minutes + 1 };
				}
				if (t.minutes === 59) {
				  return { ...t, minutes: 0, hours: t.hours + 1 };
				}
				return { ...t, seconds: t.seconds + 1 };
			  });
			},
			velocity ? ONE_SECOND_TO_MILLISECOND / velocity : ONE_SECOND_TO_MILLISECOND
			);
		setIntervalState(interval);
			  	

		/* const intervalSeconds = setInterval(() => {
			setSeconds((s) => {
				if (s === 59) {
					return 0
				}
				return s +1 
			})
		}, velocity ? 1000/velocity : 1000);

		/* const intervalMinutes = setInterval(() => {
			setMinutes((m) => {
				if (m === 59) {
					return 0
				}
				return m +1 
			})
		}, velocity ? 1000*61/velocity : 61000);

		const intervalHours = setInterval(() => {
			setHours((h) => {
				if (h === 23) {
					return 0
				}
				return h +1 
			})
		}, velocity ? 1000*61*60/velocity : 3660000); 

		setIntervalSeconds(intervalSeconds);
		setIntervalMinutes(intervalMinutes);
		setIntervaHours(intervalHours); */
	}

	const handleStop = () =>{
		if(!intervalState){
			console.log('No hay intervalo activo');
			return
		  }
		  clearInterval(intervalState);

		/* if (stateIntervalSeconds && stateIntervalMinutes && stateIntervalHours) {
			clearInterval(stateIntervalSeconds);
			clearInterval(stateIntervalMinutes);
			clearInterval(stateIntervalHours);
		}

		setIntervalSeconds(null);
		setIntervalMinutes(null);
		setIntervaHours(null); */
	};

	const handleReset = () => {
		handleStop();
    	setTimer(timerInitialState);

		/* handleStop();
		setSeconds(0);
		setMinutes(0);
		setHours(0); */
	};

	const handleVelocity = (vel, velText) => {
		if(intervalState){
			handleStop()
		}		

		setVelocity(vel);
		setVelocityName(velText);		
	};

	return (
		<Container>
			<Row className="mt-5">
        		<Col xs={12} lg={{ span: 6, offset: 3 }} className="text-center">
				<ButtonGroup aria-label="Basic example" className='d-block my-1'>
					<Button variant="outline-success" onClick={handleStart} disabled={stateIntervalSeconds && stateIntervalMinutes && stateIntervalHours}>Comenzar</Button>
					<Button variant="outline-danger" onClick={handleStop}>Detener</Button>
					<Button variant="outline-dark" onClick={handleReset}>Reiniciar</Button>
				</ButtonGroup>
				<ButtonGroup aria-label="Basic example">
					<Button variant="outline-dark" className={velocityName === "Min" && "active"} onClick={()=>handleVelocity(1,"Min")}>Min</Button>
					<Button variant="outline-dark" className={velocityName === "x2" && "active"} onClick={()=>handleVelocity(2,"x2")}>x2</Button>
					<Button variant="outline-dark" className={velocityName === "x4" && "active"} onClick={()=>handleVelocity(4, "x4")}>x4</Button>
					<Button variant="outline-dark" className={velocityName === "x6" && "active"} onClick={()=>handleVelocity(6, "x6")}>x6</Button>
					<Button variant="outline-dark" className={velocityName === "Min" && "active"} onClick={()=>handleVelocity(10, "Max")}>Max</Button>
				</ButtonGroup>

				<Card style={{ width: "25rem" }} className="m-auto my-3">
					<Card.Body>
					<Card.Title>Stopwatch / Timer</Card.Title>
					<Card.Text>
						{oneOrTwoNum(hours)} hora{pluralSingular(hours)} - {oneOrTwoNum(minutes)} minuto{pluralSingular(minutes)} - {oneOrTwoNum(seconds)} segundo{pluralSingular(seconds)}
					</Card.Text>
					</Card.Body>
					<Card.Footer>
					{oneOrTwoNum(hours)}:{oneOrTwoNum(minutes)}:{oneOrTwoNum(seconds)}
					</Card.Footer>
          		</Card>
				</Col>
			</Row>
		</Container>

		
	)
}
