import React, { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditTodo({todo}) {
    const [description, setDescription] = useState(todo.description);
    const [task, setTask] = useState(todo.task);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setDescription(todo.description);
        setTask(todo.task);
        setShow(false);
    }
    
    const handleShow = () => setShow(true);
    //Edit card 
    const setCard = async() => {
        try {
            const body = {task, description};
            const response = await fetch (`http://localhost:5000/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location="/";
            setShow(false);
            //console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <Button variant="primary" data-target={`#id${todo.todo_id}`} onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} id={`id${todo.todo_id}`}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" value={task} onChange={e => setTask(e.target.value)}/>
                    <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => handleClose(e)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => setCard(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment> 
    )
}

export default EditTodo;