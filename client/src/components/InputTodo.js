import React, { Fragment, useState } from "react";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const InputTodo = () => {
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("");
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { task, description };//might break
            const response = await fetch("http://localhost:5000/todos", { //fix port to env
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/"
        } catch (err) {
            console.error(err.message);
        }

    };
    return (
        <Fragment>
            <h2 className="text-center mt-5">Todo List</h2>
            <Form onSubmit={onSubmitForm}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Task"
                    className="mb-3"
                >
                    <Form.Control 
                        type="text" 
                        placeholder="Task to Accomplish" 
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel  
                    controlId="floatingInput" 
                    label="Description"
                    className="mb-3" 
                >
                    <Form.Control 
                        type="text" 
                        placeholder="Leave your description here"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{height: '100px'}}
                    />
                </FloatingLabel>
                <Button  variant="success" type="submit">Add</Button>
            </Form>
        </Fragment>
    )
}

export default InputTodo;