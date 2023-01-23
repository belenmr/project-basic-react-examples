import { useState } from "react";

export const useForm = (initialState = {}, refForm) => {

    const [state, setState] = useState(initialState);
    
    const handleChange = ({target: {name, value}}) => {
        //console.log({[target.name]:target.value});
        setState({
            ...state, //propagacion
            [name]: value,
        });
    };

    const reset = () => {
        setState(initialState);
        refForm.current?.reset();
    }

    return [state, setState, handleChange, reset];    
};

/* 
Propagación
const info1 = {name: "Alexander", img: "http:img.png"}
const info2 = {description: "description1"}

const allInfo = {...info1, ...info2}

{name: "Alexander", img: "http:img.png", description: "description1"}
*/