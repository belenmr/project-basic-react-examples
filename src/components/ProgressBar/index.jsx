import { useRef } from "react";
import { useState } from "react"
import { Container, Row, Col, Button, Card, ProgressBar as BarProgress, FormControl,  } from "react-bootstrap"

export const ProgressBar = () => {
	const [now, setNow] = useState(0);
	const inputRef = useRef(null);

	const handleDownload = () => {
		const valueInput = inputRef.current?.value
		const interval = setInterval(() => {
			/* setNow(now +1); */
			setNow((now) => {                
				//console.log(now);
				if (now === +valueInput) { /* parseamos valueInput con el + adelante*/
					clearInterval(interval)
					return now
				}
				return now + 1
			}); /* Callback */
		}, 1000);
	}

	return (
		<Container>
			<Row className="mt-5">                
				<Col xs={12} md={{span:8, offser:2}} className="text-center">                
				<Card style={{ width: '40rem' }} className='m-auto'>                
					<Card.Body>
						<Card.Title>Progress Bar</Card.Title>
						<BarProgress animated now={now} label={`${now}%`} variant='danger' />

						<FormControl
							ref={inputRef}
							placeholder="Ingresar tiempo de descarga"
							className="my-3"
						>

						</FormControl>                    

						<Button variant="primary" onClick={handleDownload}>Descargar</Button>
					</Card.Body>
				</Card>
				</Col>
			</Row>
		</Container>
	)
}
