import { Button, Form, } from "react-bootstrap";

export default function FormTask({onChange, inputsValues, onSubmit, refForm, action}) {
	return (
		<Form onSubmit={onSubmit} ref={refForm}>
			<Form.Group className="mb-3" >
				<Form.Label>Titulo</Form.Label>
				<Form.Control type="text" placeholder="Ingresar un titulo" value={inputsValues.title} onChange={onChange} name="title"/>            
			</Form.Group>

			<Form.Group className="mb-3" >
				<Form.Label>Imagen</Form.Label>
				<Form.Control type="text" placeholder="Ingresar un url" value={inputsValues.img} onChange={onChange} name="img"/>
			</Form.Group>

			<Form.Group className="mb-3" >
				<Form.Label>Descripcion</Form.Label>
				<Form.Control as={'textarea'} type="text" placeholder="Ingresar una descripcion" value={inputsValues.description} onChange={onChange} name="description"/>
			</Form.Group>
			
			<Button variant="primary" type="submit" className="mx-2">
				{action === "CREATE" ? "Crear" : "Actualizar"}
			</Button>
			<Button variant="danger" type="reset">Reiniciar</Button>           
		</Form>    
	)
}
