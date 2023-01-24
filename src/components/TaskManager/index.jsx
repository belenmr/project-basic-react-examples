import React from 'react';
import { useReducer, useRef, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { CardItem } from './CardItem';
import FormTask from "./Form";

const generateId = () => Math.random().toString(36).substring(2, 18);

const taskReducer = (state, action) => { //{type, payload}
    switch (action.type) {
        case 'ADD':            
            const newTask = {
               ...action.payload,
               id: generateId(),
               active:false,
               completed: false 
            }
            console.log(action.payload);
            return [...state, newTask];

        case 'UPDATE':
            const taskToUpdate = action.payload;
            const tasksUpdated = state.map((task) => {
                if (task.id === taskToUpdate.id) {
                    return {
                        ...task,
                        ...taskToUpdate
                    }
                }
                return task
            })
            return tasksUpdated;
    
        default:
            break;
    }
}

export const TaskManager = () => {
    const refForm = useRef(null);
    const [inputsValues, setInputsValues, handleChangeInputValues, reset] = useForm({}, refForm);
    //const [tasks, setTasks] = useState([{},{}]);

    const [action, setAction] = useState("CREATE");

    const [tasks, dispatch] = useReducer(taskReducer, []) //dispatch({type,payload})


    /* const [inputsValues, setInputsValues] = useState({});
    
    const handleChangeInputValues = ({target: {name, value}}) => {
        //console.log({[target.name]:target.value});
        setInputsValues({
            ...inputsValues, //propagacion
            [name]: value,
        });
    }; */

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (action === "CREATE") {
            dispatch({type: "ADD", payload: inputsValues});            
        }

        if (action === "UPDATE") {
            dispatch({type: "UPDATE", payload: inputsValues});            
        }


        //setTasks([...tasks, inputsValues]);
        reset();
    }

    const handleUpdate = (id) => {
        console.log("quiero actualizar item " + id);
        const taskFound = tasks.find(task => task.id === id)
        setInputsValues(taskFound)
        setAction("UPDATE");
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputValues} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={{refForm}} action={action} />                     
                </Col>
                <Col sm={12} lg={9}>
                    {
                        tasks.map((taskMap) => {
                            return <CardItem key={taskMap.id} task={taskMap} onUpdate={handleUpdate} />
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}
