//import { useState } from "react"
import { Button, Col, Container, Row, Toast, } from "react-bootstrap"
import { useShow } from "../../hooks/useShow"

export const ShowHideMessage = () => {
	const {show, handleShowMessage} = useShow(false);

	/* lo pasamos a hook
	const [show, setShow] = useState(false)
	const handleShowMessage = () => setShow(!show) */
	
	return (
		<Container>
			<Row className="mt-5">                
				<Col xs={12} md={{span:6, offser:3}} className="text-center">                
					<Button className="mb-2" variant={show ? 'danger' : 'success'} onClick={handleShowMessage}>                        
						{show ? 'Ocultar' : 'Mostrar'} mensaje
					</Button>
					<Toast show={show} className="m-auto" onClose={handleShowMessage}>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded me-2"
								alt=""
							/>
							<strong className="me-auto">ReactJS</strong>
							<small>11 mins ago</small>
						</Toast.Header>
						<Toast.Body>¡Primera clase!</Toast.Body>
					</Toast>
				</Col>
			</Row>
		</Container>
	)
}