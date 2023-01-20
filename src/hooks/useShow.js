import { useState } from "react";

export const useShow =(initialState /* = false */) => {
	const [show, setShow] = useState(initialState);
	const handleShowMessage = () => setShow(!show);

	return {show, handleShowMessage}
}