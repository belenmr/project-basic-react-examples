import { useRef } from "react";
import { useState } from "react"
import { Container, Row, Col, Button, Card, ProgressBar as BarProgress, FormControl, Modal, } from "react-bootstrap"
import ProgressBar2 from "./ProgressBar2";

export const ProgressBar = () => {
	const [now, setNow] = useState(0);
	const [intervalState, setIntervalState] = useState(null);
	const [btnDisable, setBtnDisable] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const inputRef = useRef(null);

	const handleDownload = () => {
		const valueInput = +inputRef.current?.value /* parseamos valueInput con el + adelante*/
		const isValueValid = !isNaN(valueInput) && valueInput>0 && valueInput<=100;
		setShowModal(!isValueValid);

		if (intervalState) {
			handleReset();
		} else {
			
		}

		if(isValueValid){
			const interval = setInterval(() => {
				/* setNow(now +1); */
				setNow((now) => {                
					console.log(now);
					if (now === valueInput) { 
						clearInterval(interval)
						return now
					}
					return now + 1
				}); /* Callback */
			}, 1000);

			setIntervalState(interval);
		} else {
			handleReset();
		}
	}

	const handleReset = () => {
		clearInterval(intervalState);
		setNow(0);
	}

	const handleChange = ({target: {value}}) => { /* destructuring de event */
		//console.log(event.target.value);
		setBtnDisable(!!!+value); /* con + parsemos de string a numero y luego con los !! lo parseamos a booleano */
	}

	const handleClose = () => {
		setShowModal(false);
	}

	return (
		<Container>
			<Row className="mt-5">                
				<Col xs={12} md={{span:8, offser:2}} className="text-center">                
				<Card style={{ width: '40rem' }} className='m-auto'>                
					<Card.Body>
						<Card.Title>Progress Bar</Card.Title>
						<BarProgress animated now={now} label={`${now}%`} variant='danger' />

						<ProgressBar2 now={now} label={`${now}%`} />

						<FormControl
							ref={inputRef}
							placeholder="Ingresar tiempo de descarga"
							className="my-3"
							onChange={handleChange}
						>

						</FormControl>                    

						<Button variant="primary" onClick={handleDownload} disabled={btnDisable}>Descargar</Button>
						<Button variant="danger" onClick={handleReset}>Reiniciar</Button>
					</Card.Body>
				</Card>
				</Col>

			</Row>
				<Modal show={showModal} onHide={handleClose} >
					<Modal.Header closeButton>
						<Modal.Title className="text-danger">ERROR ❌</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<>
							{/*<h2 className="text-danger text-center py-4">ERROR ❌</h2>*/}
							<p className="text-muted fs-4 text-center">
								Solo se acepta valores numéricos. El valor debe ser mayor a 0 y menor e igual a 100.
							</p>
						</>
					</Modal.Body>					
				</Modal>
		</Container>
	)
}
