import React, { Fragment, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EditTodo from "./EditTodo";

function ListTodo() {
    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);


    return (
        <Fragment>
            {todos.map(todo => (
                <Card key={todo.todo_id} style={{ width: '18rem' }}>

                    <Card.Body>
                        <Card.Title>{todo.task}</Card.Title>
                        <Card.Text>
                            {todo.description}
                        </Card.Text>
                        <EditTodo todo={todo}/>
                        <Button 
                            variant="danger" 
                            onClick={()=> deleteTodo(todo.todo_id)}
                        >Delete</Button>
                    </Card.Body>
                </Card>                
            ))}


        </Fragment>
    )
}

export default ListTodo;